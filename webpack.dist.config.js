/*
 * Webpack dist server configuration
 *
 * This file is set up for serving the webpack-dev-server, which will watch for changes and recompile as required if
 * the subfolder /webpack-dev-server/ is visited. Visiting the root will not automatically reload.
 */
'use strict';
var webpack = require('webpack');

const assetPath = require('path').join(__dirname, 'dist/assets');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CleanWebpackPlugin = require('clean-webpack-plugin');
const {GenerateSW} = require('workbox-webpack-plugin');

const path = require('path');
const node_modules = path.resolve(__dirname, 'node_modules');

/**
 * Main JS files
 */
var chunks = {
  app: ['./main.js'],
  vendor: ['preact', 'redux', 'react-router', 'preact-redux'],
  book: ['./assets/json/book.js']
};

const BASE_URL    = '/iching/'
const PUBLIC_PATH = `${BASE_URL}/assets/`

module.exports = {

  output: {
    path: assetPath,

    filename: '[name].js',
    publicPath: PUBLIC_PATH
    //publicPath: '/assets/'
  },
  devtool: 'source-map',
  context: path.resolve(__dirname, 'src'),

  entry: chunks,

  stats: {
    colors: true,
    reasons: true
  },

  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      'styles': __dirname + '/src/styles',
      'components': __dirname + '/src/components/',
      'reducers': __dirname + '/src/reducers/',
      'actions': __dirname + '/src/actions/',
      'constants': __dirname + '/src/constants/',
      'pages': __dirname + '/src/pages/',

      'assets': __dirname + '/src/assets/',
      'fonts': __dirname + '/src/styles/fonts/',

      'react': 'preact-compat',
      'react-dom': 'preact-compat'
    }
  },
  module: {
    /*
    preLoaders: [{
      test: /\.(js|jsx)$/,
      exclude: /node_module/,
      loaders: ['eslint-loader',]
    }],
    */
    loaders: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: 'babel-loader'
    },
    {
      test: /\.scss/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [{
          loader: 'css-loader',
          options: {
            importLoaders: 1
          }
        }, 'postcss-loader']
      })
    },
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader', 'postcss-loader?importLoaders=1'], //ExtractTextPlugin.extract("css-loader")
    },
    {
      test: /\.(png|jpg)$/,
      use: 'url-loader?limit=5000'
    },
    {
      test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      use: {
        loader: 'file-loader',
        options: {
          outputPath: 'fonts/',
          name: '[name].[ext]'
        }
      }
    }
    ],

  },

  plugins: [
    new CleanWebpackPlugin(['dist']),
    
    /*new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.js' }),*/
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.js',

      // filter-out book.js
      chunks: ["app", "vendor"]
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "book",
      filename: 'book.js',
      chunks: ["book"]
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      __PUBLIC_PATH__: PUBLIC_PATH,
      __DEVELOPMENT__: false,
      __DEVTOOLS__: false,
      'process.env.NODE_ENV': '"production"'
    }),
    new ExtractTextPlugin('main.css'),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      mangler: true,
      compress: {
        warnings: false,
        booleans: true,
        conditionals: true,
        dead_code: true,
      }
    }),
    //new BundleAnalyzerPlugin()
    new GenerateSW({
      'cacheId': 'iching',
      'importWorkboxFrom': 'local',
      'swDest': 'assets/sw.js',
      'importsDirectory': 'wb-assets',
      'navigateFallback': `${BASE_URL}/`,
      'modifyUrlPrefix': {
        '/assets/': PUBLIC_PATH
      }
    })
  ]

};
