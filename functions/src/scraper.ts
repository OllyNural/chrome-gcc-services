import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import axios from 'axios';
import * as cheerio from 'cheerio';

const scraper = (fAdmin: admin.app.App) => functions.pubsub.schedule('5 0 * * *')
    .timeZone('Europe/London')
    .onRun(async () => {
      const firestore = fAdmin.firestore();
      console.log('This will be run every day at 11:05 AM GMT!');
      const {data} = await axios.get('https://www.theguardian.com/crosswords/series/quick');
      console.log('Retrieved guardian crosswords');
      const $ = cheerio.load(data);
      const links = $('div > a');

      const crosswordLinks = links
          .toArray()
          .filter((link) => $(link).text().includes('Quick crossword'));

      const crosswordIds = crosswordLinks
          .map((link) => {
            const id = $(link).prev().find('div:nth-of-type(1) h3 a span span').text().trim()
                .replace('Quick crossword No ', '')
                .replace(',', '');

            const timestamp = $(link).prev().find('div:nth-of-type(2) div time')
                .attr('data-timestamp');

            const date = $(link).prev().find('div:nth-of-type(2) div time span:nth-of-type(2)')
                .text()
                .replace('Published: ', '')
                .trim();

            return {
              id,
              timestamp,
              date,
            };
          });

      const batch = firestore.batch();
      crosswordIds.forEach(({id, timestamp, date}) => {
        const cWordRef = firestore
            .collection('crosswords').doc('quick')
            .collection('ids').doc(id);
        batch.set(cWordRef, {id, timestamp, date});
      });

      batch.commit();
      return null;
    });

export {scraper};
