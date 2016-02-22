import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

import * as _ from 'lodash';
import del from 'del';
import RunSequence from 'run-sequence';
import scraper from 'scraperjs'

import scrapeIchingTable from './src/scrape/scrape_deoxy.js'

const $ = gulpLoadPlugins();
let options = {};

gulp.task('clean', (cb) => {
  del(['dist/'], cb);
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

gulp.task('assets', (cb) => {
  return gulp.src('src/public/**')
    .pipe(gulp.dest('dist/assets/'))
    .pipe($.size({title: 'assets'}));
});

gulp.task('copy', (cb) => {
  return gulp.src(['./src/*.html','./src/*.ico'])
             .pipe(gulp.dest('dist/'));
});

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
