import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

var path = require('path');

import * as _ from 'lodash';
import del from 'del';

import RunSequence from 'run-sequence';
import scraper from 'scraperjs'

import scrapeIchingTable from './src/scrape/scrape_deoxy.js'

const $ = gulpLoadPlugins();
let options = {};

gulp.task('clean', (cb) => {
  return del(['dist/']);
});

// Scrape ichingfortune and save to #{./src/public/iching.json}
gulp.task('scrape', (cb) => {
    scrapeIchingTable();
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
  RunSequence('bundle', cb);
});

// Bundle everything for phonegap
gulp.task('bundle:phonegap', ['clean'], (cb) => {
  options.dist = true;
  RunSequence(['assets','copy','bundle','phonegap:copy'])
})


gulp.task('assets', (cb) => {
  gulp.src('src/public/**/*')
    .pipe(gulp.dest('dist/assets/'))
    .pipe($.size({title: 'assets'}));
});

gulp.task('sprites', function() {
  // Create sprite from tarot images
  let tarot = gulp.src('extra/tarot/*.jpg')
                   .pipe($.spritesmith({cssName: "tarot_sprites.css",
                         imgName: 'tarot-sprite.png',
                        }))

  tarot.img.pipe( gulp.dest('src/public/img/tarot/') )
  tarot.css.pipe( gulp.dest('src/styles/components/'))
});

gulp.task('copy', (cb) => {
  gulp.src(['./src/*.html','./src/*.ico'])
             .pipe(gulp.dest('dist/'));
});

gulp.task('phonegap:copy', (cb) => {
  gulp.src(['dist/**/*'])
      .pipe( gulp.dest('phonegap/www/') );
})

gulp.task('build', ['clean'], (cb) => {
  RunSequence(['assets', 'copy','bundle'], cb)
});

gulp.task('build:dist', ['clean'], (cb) => {
  options.dist = true;
  RunSequence(['assets', 'copy','bundle'], cb)
});

gulp.task('build:watch', ['clean'], (cb) => {
  options.watch = true;
  RunSequence(['build'], () => {
    gulp.watch('src/public/**', ['assets']);
  });
});

gulp.task('serve', () => {
  const config = require('./webpack.config');
  const bundler = webpack(config);
  let server = new WebpackDevServer(bundler, {
    host: '0.0.0.0',
    contentBase: [path.join(__dirname, "src")],

    publicPath: '/assets/',
    hot: true,
    historyApiFallback: false,
    stats: {
      colors: true
    },
  });
  server.listen('9999', 'localhost', (err) => {
    console.log('server listen at http://0.0.0.0:9999');
  });
});
