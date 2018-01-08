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
    /*
    webpack: {
      cache: true,
      devtool: 'inline-source-map',
      module: {
        loaders: [
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
          styles:     path.join(process.cwd(), "./src/styles/"),
          components: path.join(process.cwd(), "./src/components/"),
          src:        path.join(process.cwd(), "./src/"),
        }
      },
    },
    */
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
    browsers: ["Chrome"],
    reporters: ["spec"],
    captureTimeout: 20000,
    singleRun: false,
    plugins: [
      require("karma-spec-reporter"),
      require("karma-jasmine"),
      require("karma-webpack"),
      //require("karma-babel-preprocessor"),
      //require("karma-phantomjs-launcher"),
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
