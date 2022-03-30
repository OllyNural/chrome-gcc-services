import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

const getCrosswords = (fAdmin: admin.app.App) => functions.https.onRequest(async (request, response) => {
  const firestore = fAdmin.firestore();
  // const authHeader = request.header('Authorization');
  // let token;
  // if (authHeader) {
  //   try {
  //     token = await fAdmin.auth().verifyIdToken(authHeader);

  //     if (!token.email) {
  //       functions.logger.warn('No email associated with the ID token');
  //       response.sendStatus(401);
  //       return;
  //     }

  //     try {
  //       const user = await firestore.doc(token.email).get();
  //       if (user && user.exists) {
  //         functions.logger.warn('User is not registered in User database');
  //         response.sendStatus(401);
  //         return;
  //       } else {
  // const crosswords = {};

  // (await firestore.collection('crosswords').get()).forEach(doc => {
  //   doc.get().collection('ids')
  // })

  const crosswordTypesSnapshot = await firestore.collection('crosswords').get();

  // functions.logger.log('crosswordTypesSnapshot');
  // functions.logger.log(crosswordTypesSnapshot);
  // functions.logger.log(crosswordTypesSnapshot.docs);
  const crosswordMap: Record<string, any>[] = [];

  for (const doc of crosswordTypesSnapshot.docs) {
    const crosswordType: string = doc.data().id;
    const crosswordIds: any = [];
    await (await doc.ref.collection('ids').get()).forEach((data) => {
      const d = data.data();
      crosswordIds.push(d);
    });
    // functions.logger.log(crosswordIds);
    crosswordMap.push({
      type: crosswordType,
      crosswords: crosswordIds,
    });
  }

  // functions.logger.log(crosswordMap);

  // retrieve and send back Database content
  // }

  // const updatedUser = await (await firestore.doc(token.email).get()).data();
  response.send(crosswordMap);
  //     } catch (error) {
  //       functions.logger.error('Internal Server Error', error);
  //       response.sendStatus(500);
  //     }
  //   } catch (error) {
  //     functions.logger.error('Failed to retrieve ID token from Firestore', error);
  //     response.sendStatus(401);
  //   }
  // } else {
  //   response.sendStatus(401);
  // }
});

export {getCrosswords};
