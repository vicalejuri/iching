import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

import * as _ from 'lodash';
import del from 'del';
import RunSequnence from 'run-sequence';
import scraper from 'scraperjs'
import fs from 'fs';
import http from 'http';
import async from 'async';

const $ = gulpLoadPlugins();
let options = {};

gulp.task('clean', (cb) => {
  del(['dist/'], cb);
});

var download = function(url, dest, cb) {
  var file = fs.createWriteStream(dest);
  var request = http.get(url, function(response) {
    response.pipe(file);
    file.on('finish', function() {
      file.close(cb);
    });
  });
}

gulp.task('scrapeSVG', (cb) => {
});

// Scrape ichingfortune and save to #{./src/public/iching.json}
gulp.task('scrape', (cb) => {
  let URL_BASE = "http://ichingfortune.com";
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
        fname.last().split('/')[0].trim(),
        fname.last().split('/')[1].trim(),
        Number( fname.first().match(/\d+$/)[0] ),
      ];
      console.log(name, description, num);

      // Get interpretation fields( 'introduction','judgment','image','lines')
      let articles = $('article > h2').get();
      let interpretation = _._(articles.map( (v) => {
          let title = $(v).text().toLowerCase();
          let interp = $(v).next('p').text().trim();

          switch ( title ){
            // TODO:
            case "the lines":
              return undefined;
            case "the image":
              title = "image";
          }

          return [ title ,  interp ];
      })).reject( _.isUndefined ).zipObject().value();

      // Download image locally
      let IMAGE_OUTPUT = (iname) => `./src/images/iching/${iname}.gif`;
      let image_url = [ URL_BASE, $('article > img').attr('src').substr(3) ].join('/');
      download(image_url, IMAGE_OUTPUT(name));
      let image = `./image/${name}.gif`;

      return {
        name:  name, description: description, number: num,
        image: image, trigrams: {
          above: $(trigrams[0]).text().replace('Above','').trim(),
          below: $(trigrams[2]).text().replace('Below','').trim()
        },
        interpretation: interpretation
      };
  });



  // Download 64 hexagrams
  let URL_HEXAGRAM = (id) => `http://ichingfortune.com/hexagrams/${id}.php`;
  let JSON_OUTPUT = './src/public/iching.json';

  let urls = _.range(1,65).map( URL_HEXAGRAM );
  let iching = [];

  async.eachLimit( urls, 2 , (url, done) => {
    router.route(url, (found,returned) => {
      if (found && returned){
          iching.push(returned);
      }
      done();
    });
  }, (err) => {
    var ichingTable = _._(iching).sortBy('number').value();
    fs.writeFile( JSON_OUTPUT , JSON.stringify(ichingTable, null, 4));
  })

});

// run webpack bundler
gulp.task('bundle', (cb) => {
  const config = require(`./webpack.${options.dist ? 'dist.' : ''}config`);
  const bundler = webpack(config);

  function bundlerCallback(err, stats) {
    console.log(stats.toString());
  }
  if (options.watch) {
    bundler.watch(200, bundlerCallback);
  } else {
    bundler.run(bundlerCallback);
  }
});

gulp.task('bundle:dist', (cb) => {
  options.dist = true;
  RunSequnence('bundle', cb);
});

gulp.task('assets', (cb) => {
  return gulp.src('src/public/**')
    .pipe(gulp.dest('dist/')).
    pipe($.size({title: 'assets'}));
});

gulp.task('build', ['clean'], (cb) => {
  RunSequnence(['assets', 'bundle'], cb)
});

gulp.task('build:dist', ['clean'], (cb) => {
  options.dist = true;
  RunSequnence(['assets', 'bundle'], cb)
});

gulp.task('build:watch', ['clean'], (cb) => {
  options.watch = true;
  RunSequnence(['build'], () => {
    gulp.watch('src/public/**', ['assets']);
  });
});

gulp.task('serve', () => {
  const config = require('./webpack.config');
  const bundler = webpack(config);
  let server = new WebpackDevServer(bundler, {
    contentBase: './src',
    publicPath: '/assets/',
    hot: true,
    stats: {
      colors: true
    },
  });
  server.listen('9999', 'localhost', (err) => {
    console.log('server listen at 9999');
  });
});
