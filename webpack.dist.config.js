/*
 * Webpack development server configuration
 *
 * This file is set up for serving the webpack-dev-server, which will watch for changes and recompile as required if
 * the subfolder /webpack-dev-server/ is visited. Visiting the root will not automatically reload.
 */
'use strict';
var webpack = require('webpack');

var assetPath = require('path').join(__dirname, 'dist/assets');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {

  output: {
    path: assetPath,
    filename: 'main.js',
  },
  devtool: 'source-map',
  progress: true,
  entry: [
    './src/main.js'
  ],

  stats: {
    colors: true,
    reasons: true
  },

  resolve: {
    extensions: ['', '.js', '.jsx','.json'],
    alias: {
      'styles': __dirname + '/src/styles',
      'components': __dirname + '/src/components/',
      'reducers': __dirname + '/src/reducers/',
      'actions': __dirname + '/src/actions/',
      'constants': __dirname + '/src/constants/',
      'pages': __dirname + '/src/pages/',
      'public': __dirname + '/src/public',
    }
  },
  module: {
    preLoaders: [{
      test: /\.(js|jsx)$/,
      exclude: /node_module/,
      loader: 'eslint-loader'
    }],
    loaders: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'react-hot!babel'
    },
    { test: /\.scss/,
      loader: ExtractTextPlugin.extract('css-loader?sourceMap!sass-loader?sourceMap')
    },
    { test: /\.css$/,
      loader: ExtractTextPlugin.extract("css-loader")
    },
    { test: /\.(png|jpg)$/,
      loader: 'url-loader?limit=8192'
    },
    /*
    { test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'file-loader'
    },
    */
    {
      test: /\.(woff|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'base64-font-loader'
    },
    /*
    {
      test: /\.(png|jpg|svg|eot|ttf|woff|woff2)$/,
      loader: 'url-loader?limit=8192'
    }*/],
  },

  plugins: [
    new webpack.DefinePlugin({
      __DEVELOPMENT__: false,
      __DEVTOOLS__: false  // <-------- DISABLE redux-devtools HERE
    }),
    new ExtractTextPlugin('main.css'),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      mangler: true,
      compress: {
        warnings: false,
        booleans: true,
        conditionals: true,
        dead_code: true,
      }
    }),
  ]

};
