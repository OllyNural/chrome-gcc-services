// // import axios from 'axios';
// // import * as cheerio from 'cheerio';

// const axios = require('axios');
// const cheerio = require('cheerio');

// /**
//  * main
//  */
// async function main() {
//   const {data} = await axios.get('https://www.theguardian.com/crosswords/series/quick');
//   console.log('Retrieved guardian crosswords');
//   const $ = cheerio.load(data);
//   const links = $('div > a');

//   const crosswordLinks = links
//       .toArray()
//       .filter((link) => $(link).text().includes('Quick crossword'));

//   console.log(crosswordLinks.length);

//   const crosswordIds = crosswordLinks
//       .map((link) => {
//         const id = $(link).prev().find('div:nth-of-type(1) h3 a span span').text().trim()
//             .replace('Quick crossword No ', '')
//             .replace(',', '');

//         const timestamp = $(link).prev().find('div:nth-of-type(2) div time')
//             .attr('data-timestamp');

//         const date = $(link).prev().find('div:nth-of-type(2) div time span:nth-of-type(2)')
//             .text()
//             .replace('Published: ', '')
//             .trim();

//         return {
//           id,
//           timestamp,
//           date,
//         };
//       });

//   console.log(crosswordIds);
// }
// main();
