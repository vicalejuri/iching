import * as _ from 'lodash';
import del from 'del';
import scraper from 'scraperjs'
import fs from 'fs';
import http from 'http';
import async from 'async';

let download = function (url, dest, cb) {
  let file = fs.createWriteStream(dest);
  let request = http.get(url, (response) => {
    response.pipe(file);
    file.on('finish', () => {
      file.close(cb);
    });
  });
}

export default function scrapeIchingTable() {
    /*
     * Scrape iching table / interpretation from ichingfortune.com
     * Save a JSON to ./src/public/iching.json
     */
    let URL_BASE = 'http://ichingfortune.com';
    let URL_HEXAGRAM_FORMAT = 'https?://ichingfortune.com/hexagrams/:id.:f'

    let router = new scraper.Router();
    router.otherwise( (url) => {
      console.error(`${url} could not be scraped`);
    })

    router.on(URL_HEXAGRAM_FORMAT).createStatic().scrape( ($) => {
        let trigrams = $('article #image > li');

        // Number - Name / Description
        let fname = _._( $('article > h1').text().split(' - ') );
        let [ name, description, num ] = [
          fname.last().split('/')[0].trim().replace('\'',''),
          fname.last().split('/')[1].trim().replace('\'',''),
          Number( fname.first().match(/\d+$/)[0] ),
        ];
        console.log(num, name, description);

        // Get interpretation fields( 'introduction','judgment','image','lines')
        let articles = $('article > h2').get();
        let interpretation = _._(articles.map( (v) => {
            let title = $(v).text().toLowerCase();
            let interp = $(v).next('p').text().trim();

            switch ( title ) {
              // TODO: To parse lines correctly for now just save it raw
              case 'the lines':
                return undefined;
              case 'the image':
                title = 'image';
                break;
              default:
                title = 'Unknow';
            }

            return [ title ,  interp ];
        })).reject( _.isUndefined ).zipObject().value();

        // Download image locally
        let IMAGE_OUTPUT = iname => `./src/images/iching/${iname}.gif`;
        let image_url = [ URL_BASE,
                        $('article > img').attr('src').substr(3) ]
                        .join('/');
        download(image_url, IMAGE_OUTPUT(name));
        let image = `./images/${name}.gif`;

        // Get Trigrams of hexagram
        let getTrigram = (tri) => {
          let tri_name = $(tri).text().replace(/Above|Below|'/,'')
                               .trim().splice(' ')[0].toLowerCase();
          return tri_name;
        }
        let { above, below } = [ getTrigram(trigrams[0]), getTrigram(trigrams[2]) ];

        return {
          name,
description,
number: num,
          trigrams: {
            above,
            below,
          },
          interpretation
        };
    });


    // Download all 64 hexagrams
    let URL_HEXAGRAM = id => `http://ichingfortune.com/hexagrams/${id}.php`;
    let JSON_OUTPUT = './src/constants/iching.json';

    let urls = _.range(1,65).map( URL_HEXAGRAM );
    let iching = [];

    async.eachLimit( urls, 2 , (url, done) => {
      router.route(url, (found,returned) => {
        if (found && returned) {
            iching.push(returned);
        }
        done();
      });
    }, (err) => {
      // Save JSON
      let ichingTable = _._(iching).sortBy('number').value();
      fs.writeFile( JSON_OUTPUT , JSON.stringify(ichingTable, null, 4));
    })
}
