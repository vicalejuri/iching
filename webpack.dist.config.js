/*
 * Webpack dist server configuration
 *
 * This file is set up for serving the webpack-dev-server, which will watch for changes and recompile as required if
 * the subfolder /webpack-dev-server/ is visited. Visiting the root will not automatically reload.
 */
'use strict';
var webpack = require('webpack');

var assetPath = require('path').join(__dirname, 'dist/assets');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

var path = require('path');
var node_modules = path.resolve(__dirname, 'node_modules');

module.exports = {

  output: {
    path: assetPath,

    filename: 'main.js',
    publicPath: '/react-iching/assets/'
  },
  devtool: 'source-map',
  progress: true,
  entry: {
    app: './src/main.js',
    vendor: ['react','react-dom','redux','react-redux','material-ui'],
  },

  stats: {
    colors: true,
    reasons: true
  },

  resolve: {
    extensions: ['', '.js', '.jsx','.json','.css','.jpg','.png','.gif'],
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
      loaders: ['eslint-loader',]
    }],
    loaders: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    },
    { test: /\.scss/,
      loader: ExtractTextPlugin.extract('css-loader?sourceMap!sass-loader?sourceMap')
    },
    { test: /\.css$/,
      loader: ExtractTextPlugin.extract('css-loader')
    },
    { test: /\.(png|jpg)$/,
      loader: 'url-loader?limit=5000'
    },
    { test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'file-loader'
    }
  ],

  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js',Infinity),
    new webpack.DefinePlugin({
      __PHONEGAP__: false,
      __DEVELOPMENT__: false,
      __DEVTOOLS__: false,
      'process.env.NODE_ENV': '"production"'
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
    new BundleAnalyzerPlugin()
  ]

};
