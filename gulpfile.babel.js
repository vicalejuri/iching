/* eslint-disable no-alert, no-console */
import gulp from "gulp";
import gulpLoadPlugins from "gulp-load-plugins";
import gutil from "gulp-util";

import webpack from "webpack";
import WebpackDevServer from "webpack-dev-server";
import BrowserSync from "browser-sync";

import eslint from "gulp-eslint";

import del from "del";
import run from "gulp-run";

import RunSequence from "run-sequence";
import scraper from "scraperjs";

import scrapeIchingTable from "./extra/scrape/scrape_deoxy";

const $ = gulpLoadPlugins();
var path = require("path");

const browserSync = BrowserSync.create();

let options = {};

gulp.task("clean", cb => {
  return del(["dist/"]);
});

// Scrape ichingfortune and save to #{./src/assets/iching.json}
gulp.task("scrape", cb => {
  scrapeIchingTable();
});

gulp.task("lint", () => {
  return gulp
    .src(["src/**/*.js"])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

// run webpack bundler
gulp.task("bundle", cb => {
  const config = require(`./webpack.${options.dist ? "dist." : ""}config`);
  const bundler = webpack(config);

  function bundlerCallback(err, stats) {
    console.log(stats.toString());
    gutil.log("[webpack]", stats.toString({
      colors: true,
      progress: true
    }));
    browserSync.reload();
    cb();
  }

  if (options.watch) {
    bundler.watch(200, bundlerCallback);
  } else {
    bundler.run(bundlerCallback);
  }
});

gulp.task("bundle:dist", cb => {
  options.dist = true;
  RunSequence("bundle", cb);
});

// Bundle everything for phonegap
gulp.task("bundle:phonegap", ["clean"], cb => {
  options.dist = true;
  RunSequence(["assets", "copy", "bundle", "phonegap:copy"]);
});

gulp.task("assets", cb => {
  return gulp.src("src/assets/**/*").pipe(gulp.dest("dist/assets/"));
});

gulp.task("sprites", function() {
  // Create sprite from tarot images
  let tarot = gulp.src("extra/tarot/*.jpg").pipe(
    $.spritesmith({
      cssName: "tarot_sprites.css",
      imgName: "tarot-sprite.png"
    })
  );

  tarot.img.pipe(gulp.dest("src/assets/img/tarot/"));
  tarot.css.pipe(gulp.dest("src/styles/components/"));
});

/*
gulp.task("fonts", cb => {
  gulp.src(["./src/styles/fonts/*"]).pipe(gulp.dest("dist/assets/fonts"));
});
*/

gulp.task("copy", cb => {
  gulp
    .src(["./src/*.html", "./src/*.ico", "./src/*.webmanifest"])
    .pipe(gulp.dest("dist/"));
  cb()
});

gulp.task("phonegap:copy", cb => {
  gulp.src(["dist/**/*"]).pipe(gulp.dest("phonegap/www/"));
});

gulp.task("build", ["clean"], cb => {
  RunSequence(["assets", "copy", "bundle"], cb);
});

gulp.task("build:dist", ["clean"], cb => {
  options.dist = true;
  RunSequence(["assets", "copy", "bundle"], cb);
});

gulp.task("build:watch", ["clean"], cb => {
  options.watch = true;
  RunSequence(["build"], () => {
    gulp.watch("src/styles/**", ["assets"]);
  });
});

gulp.task("dev-server", ["copy"], cb => {
  browserSync.init({
    server: {
      baseDir: './dist/'
    }
  })
  gulp.watch("./src/**/*.js", ["bundle"]);

  //return run("webpack-dev-server", { verbosity: 3 }).exec();
});

gulp.task("gh-publish", cb => {
  gulp
    .src(["./dist/**"])
    .pipe(gulp.dest("docs/"));
});
