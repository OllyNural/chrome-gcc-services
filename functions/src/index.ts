import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import {getCrosswords} from './getCrosswords';
import {scraper} from './scraper';

const fAdmin = admin.initializeApp();

export const Authenticate = functions.https.onRequest(async (request, response) => {
  const firestore = admin.firestore().collection('users');
  const authHeader = request.header('Authorization');
  let token;
  if (authHeader) {
    try {
      token = await fAdmin.auth().verifyIdToken(authHeader);

      if (!token.email) {
        functions.logger.warn('No email associated with the ID token');
        response.sendStatus(401);
        return;
      }

      try {
        const user = await firestore.doc(token.email).get();
        if (user && user.exists) {
          await user.ref.update({
            last_login: new Date().toISOString(),
          });
        } else {
          await user.ref.set({
            id: token.email,
            name: token.name,
            picture: token.picture,
            email: token.email,
            completed_crosswords: '',
            created: new Date().toISOString(),
            last_login: new Date().toISOString(),
          });
        }

        const updatedUser = await (await firestore.doc(token.email).get()).data();
        response.send({updatedUser});
      } catch (error) {
        functions.logger.error('Internal Server Error', error);
        response.sendStatus(500);
      }
    } catch (error) {
      functions.logger.error('Failed to retrieve ID token from Firestore', error);
      response.sendStatus(401);
    }
  } else {
    response.sendStatus(401);
  }
});

exports.Scraper = scraper(fAdmin);

exports.GetCrosswords = getCrosswords(fAdmin);
