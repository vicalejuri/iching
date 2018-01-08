"use strict";
/* eslint-disable no-alert, no-console */

let path          = require("path");
let webpackConfig = require('./webpack.config.js');

/* disable CommonsChunkPlugin
 * karma-webpack workaround 
 * https://github.com/webpack-contrib/karma-webpack/issues/24 
 */
const commonsChunkPluginIndex = webpackConfig.plugins.findIndex(plugin => plugin.chunkNames);
webpackConfig.plugins.splice(commonsChunkPluginIndex, 1);

module.exports = function(config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine"],
    files: [
      'node_modules/whatwg-fetch/fetch.js',
      'node_modules/babel-polyfill/dist/polyfill.js',
      //'test/helpers/pack/**/*.js',
      //'test/helpers/react/**/*.js',
      //'test/spec/components/**/*.js',
      "test/hexagram/*.js",
      "test/iching/*.js",
      "test/models/*.js",
    ],
    preprocessors: {
      "test/iching/*.js": ["webpack"],
      "test/models/*.js": ["webpack"],
      "test/hexagram/*.js": ["webpack"],
        
      //"test/helpers/createComponent.js": ["webpack"],
      //"test/spec/components/**/*.js": ["webpack"],
      //"test/spec/components/**/*.jsx": ["webpack"]
    },

    webpack: webpackConfig,
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
    autoWatch: true,
    browsers: ["PhantomJS", ],
    reporters: ["spec"],
    captureTimeout: 20000,
    singleRun: false,
    plugins: [
      require("karma-spec-reporter"),
      require("karma-jasmine"),
      require("karma-webpack"),
      //require("karma-babel-preprocessor"),
      require("karma-phantomjs-launcher"),
      require("karma-sourcemap-loader"),
      require("karma-chrome-launcher")
    ],
    phantomjsLauncher: {
      options: {
        debug: true
      }
    }
  });
};
