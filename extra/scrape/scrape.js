import * as _ from "lodash";
import del from "del";
import scraper from "scraperjs";
import fs from "fs";
import http from "http";
import async from "async";

let download = function(url, dest, cb) {
  let file = fs.createWriteStream(dest);
  let request = http.get(url, response => {
    response.pipe(file);
    file.on("finish", () => {
      file.close(cb);
    });
  });
};

/**
 * Aggregate tags(onlyTheseTags) , starting at element `from`, until we reach tag `until`
 * @param {string[]} onlyTheseTags
 * @param {object} options - Options
 * @param {cheerio.TagElement} options.from
 * @param {string} options.until
 * @returns {string[]}
 */
function gatherTags(onlyTheseTags = [], { from, until } = {}) {
  let activeElIterator = from;
  let aggregated = [];
  while (activeElIterator.name !== until) {
    if (onlyTheseTags.includes(activeElIterator.name)) {
      aggregated.push(activeElIterator);
    }
    activeElIterator = activeElIterator.next;
  }
  return aggregated;
}

export default function scrapeIchingTable() {
  /*
   * Scrape iching table / interpretation from ichingfortune.com
   * Save a JSON to ./src/assets/iching.json
   */
  let URL_BASE = "http://ichingfortune.com";
  let URL_HEXAGRAM_FORMAT = "https?://ichingfortune.com/legge-hexagrams/:id.:f";

  let router = new scraper.Router();
  router.otherwise(url => {
    console.error(`${url} could not be scraped`);
  });

  router
    .on(URL_HEXAGRAM_FORMAT)
    .createStatic()
    .scrape($ => {
      let trigrams = $("article #image > li");

      // Number - Name / Description
      let fname = _._(
        $("article > h1")
          .text()
          .split(" - ")
      );
      let [name, description, num] = [
        fname
          .get(1)
          .split("/")[0]
          .trim()
          .replace(/'/g, ""),
        fname
          .get(1)
          .split("/")[1]
          .trim(),
        Number(fname.first().match(/\d+$/)[0])
      ];

      // Get interpretation fields( 'introduction','judgment','image','lines')
      let articles = $("article > h2").get();
      let meaningTitleEl = articles.filter(article =>
        $(article)
          .text()
          .match(/Meaning/g)
      )[0];
      let meaningParagraphs = gatherTags(["p"], {
        from: meaningTitleEl,
        until: "h3"
      });

      // let interpretation = _._(
      //   articles.map(v => {
      //     let title = $(v)
      //       .text()
      //       .toLowerCase();
      //     let interp = $(v)
      //       .next("p")
      //       .text()
      //       .trim();

      //     switch (title) {
      //       // TODO: To parse lines correctly for now just save it raw
      //       case "the lines":
      //         return undefined;
      //       case "the image":
      //         title = "image";
      //         break;
      //       default:
      //         title = "Unknow";
      //     }

      //     return [title, interp];
      //   })
      // )
      //   .reject(_.isUndefined)
      //   .zipObject()
      //   .value();

      // Get Trigrams of hexagram
      let getTrigram = tri => {
        let tri_name = $(tri)
          .text()
          .replace(/Above|Below|'/g, "")
          .trim()
          .split(" ")[0]
          .toLowerCase();
        return tri_name;
      };
      let [above, below] = [getTrigram(trigrams[0]), getTrigram(trigrams[2])];

      return {
        name,
        description,
        number: num,
        trigrams: {
          above,
          below
        }
      };
    });

  // Download all 64 hexagrams
  let URL_HEXAGRAM = id =>
    `http://ichingfortune.com/legge-hexagrams/${id}.html`;
  let JSON_OUTPUT = "./src/assets/ichingfortune.json";

  let urls = _.range(1, 2).map(URL_HEXAGRAM);
  let iching = [];

  async.eachLimit(
    urls,
    2,
    (url, done) => {
      router.route(url, (found, returned) => {
        if (found && returned) {
          iching.push(returned);
        }
        done();
      });
    },
    err => {
      console.log("Done", iching);
      // Save JSON
      // let ichingTable = _._(iching)
      //   .sortBy("number")
      //   .value();
      // fs.writeFile(JSON_OUTPUT, JSON.stringify(ichingTable, null, 4));
    }
  );
}
