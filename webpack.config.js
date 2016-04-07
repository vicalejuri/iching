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

var path = require('path');
var node_modules = path.resolve(__dirname, 'node_modules');

var pathToReact = path.resolve(node_modules, 'react');
var pathToMaterialUI = path.resolve(node_modules, 'material-ui');
var pathToRedux = path.resolve(node_modules, 'redux-devtools');
var pathToReactRedux = path.resolve(node_modules, 'react-redux');

module.exports = {

  output: {
    path: assetPath,
    filename: 'main.js',
    publicPath: '/assets/'
  },

  cache: true,
  debug: true,
  devtool: 'sourcemap',
  entry: {
    app: './src/main.js',
    vendor: ['react','react-dom','redux','react-redux','material-ui'],
  },

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

      'react': pathToReact,
    }
  },
  module: {
    preLoaders: [{
      test: /\.(js|jsx)$/,
      exclude: /node_module/,
      loaders: ['eslint-loader', ],
    }],
    loaders: [
    { test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    },
    { test: /\.scss/,
      loader: ExtractTextPlugin.extract('css-loader?sourceMap!sass-loader?sourceMap')
    },
    { test: /\.css$/,
      loader: ExtractTextPlugin.extract("css-loader")
    },
    { test: /\.(png|jpg)$/,
      loader: 'url-loader?limit=500000'
    },
    { test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'file-loader'
    },
  ],

    //noParse: [ pathToReact ], pathToRedux, pathToReactRedux],
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js',Infinity),
    //new webpack.HotModuleReplacementPlugin(),
    //new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('main.css'),
    new webpack.DefinePlugin({
      __PHONEGAP__: true,
      __DEVELOPMENT__: true,
      __DEVTOOLS__: true
    }),

  ]

};
