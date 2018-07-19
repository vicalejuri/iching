"use strict";
/* eslint-disable no-alert, no-console */

let path = require("path");
let cwd  = process.cwd()

module.exports = function(config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine"],
    files: [
      //'test/helpers/pack/**/*.js',
      //'test/helpers/react/**/*.js',
      //'test/spec/components/**/*.js',
      "test/**/*.js"
    ],
    preprocessors: {
      "test/**/*.js": ["webpack", "sourcemap"],
      "test/spec/components/**/*.js": ["webpack", "sourcemap"],
      "test/spec/components/**/*.jsx": ["webpack", "sourcemap"]
    },
    webpack: {
      cache: false,
      devtool: 'inline-source-map',
      module: {
        loaders: [
          {
            test: /\.gif/,
            loader: "url-loader?limit=10000&mimetype=image/gif"
          },
          {
            test: /\.jpg/,
            loader: "url-loader?limit=10000&mimetype=image/jpg"
          },
          {
            test: /\.png/,
            loader: "url-loader?limit=10000&mimetype=image/png"
          },
          {
            test: /\.(js|jsx)$/,
            loader: "babel-loader",
            exclude: /node_modules/
          },
          {
            test: /\.scss/,
            loader: "style-loader!css-loader!sass-loader?outputStyle=expanded"
          },
          {
            test: /\.css$/,
            loader: "style-loader!css-loader"
          },
          {
            test: /\.woff/,
            loader: "url-loader?limit=10000&mimetype=application/font-woff"
          },
          {
            test: /\.woff2/,
            loader: "url-loader?limit=10000&mimetype=application/font-woff2"
          }
        ]
      },
      resolve: {
        alias: {
          styles:     path.join(cwd, "./src/styles/"),
          components: path.join(cwd, "./src/components/"),
          src:        path.join(cwd, "./src/"),
          
          helpers:    path.join(cwd, "./test/helpers/")
        }
      }
    },
    webpackMiddleware: {
      noInfo: true,
      stats: {
        colors: true
      }
    },
    exclude: [],
    port: 9090,
    logLevel: config.LOG_INFO,
    colors: true,
    autoWatch: false,
    browsers: ["PhantomJS"],
    reporters: ["spec"],
    captureTimeout: 60000,
    singleRun: true,
    plugins: [
      require("karma-spec-reporter"),
      require("karma-webpack"),
      require("karma-sourcemap-loader"), 
      require("karma-jasmine"),
      require("karma-phantomjs-launcher")
    ]
  });
};
