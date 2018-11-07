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
     * Scrape iching table / interpretation from deoxy.org/iching
     * Save a JSON to ./src/assets/iching.json
     */
    let URL_BASE = 'http://deoxy.org/iching';
    let URL_HEXAGRAM_FORMAT = 'https?://deoxy.org/iching/:id'

    let router = new scraper.Router();
    router.otherwise( (url) => {
      console.error(`${url} could not be scraped`);
      return false;
    })

    router.on(URL_HEXAGRAM_FORMAT).createStatic().scrape( ($) => {
        let tbody = $('#_header ~ p:last-of-type table').get()
        let title = $('tr:nth-of-type(2) h2', tbody);

        // X. Name / Description
        let fname = title.text().split(' / ');
        let [ num, name, description ] = [
          Number( fname[0].split('.')[0].match(/\d+$/)[0] ),
          fname[0].split('.')[1].trim().replace('\'',''),
          fname[1].trim().replace('\'',''),
        ];

        // Above, below trigrams
        let trigrams_raw = $('tr:nth-of-type(3) td tr td:nth-of-type(2) pre', tbody).get()
        let trigrams = []
        trigrams_raw.map( (v) => {
            let text = $(v).text().replace('above','').replace('below','')
                                  .replace('\'','')
                                  .trim()
                                  .split('\n');
            return {title: text[0].toLowerCase(), description: text[1]};
        })

        /* Get interpretation fields 'introduction','judgment','image','lines') */
        let interp_raw = $('tr:nth-of-type(4) tr td pre', tbody).text()
        let resume   = interp_raw.match(/[\s\S]*?THE JUDGMENT/)[0].replace('THE JUDGMENT','')
        let judgment = interp_raw.match(/THE JUDGMENT[\s\S]*?THE IMAGE/)[0]
                        .replace('THE JUDGMENT','').replace('THE IMAGE','')
        let image    = interp_raw.match(/THE IMAGE[\s\S]*?THE LINES/)[0]
                        .replace('THE IMAGE','').replace('THE LINES','')

        let lines_raw   = $('tr:nth-of-type(4) tr td pre p',tbody).text()
        let lines_clean = lines_raw.match(/THE LINES[\s\S]*?$/)[0].replace('THE LINES','')

        let lines = lines_clean.match(/\t[\s\S]*?\n\n\n/g)
        lines.map( (xl) => {
          let i       = xl.match(/\t[\s\S]*?\n\n/)[0].replace(/\t/g,'').split('\n')
          let poem    = _._( i ).reject( l => (l === '\n' || l === '')).value().join('\n')
          let expl    = xl.match(/\n\n[\s\S]*?$/)[0].replace(/\n/g,'')
          return {poem, expl}
        })

        // TODO.
        // FETCH LAST LINE, which is not in regular regexp format.
        console.log(`Scraped ${name} - ${description}`)
        return {
          number: num,
          name,
description,
          trigrams: { above: trigrams[0], below: trigrams[1]},
          interpretation: {
            resume, judgment, image, lines
          }
        };
    });


    // Download all 64 hexagrams
    let URL_HEXAGRAM = id => `http://deoxy.org/iching/${id}`;
    let JSON_OUTPUT = './src/constants/iching_deoxy_raw.json';

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
