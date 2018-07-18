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
    publicPath: '/iching/assets/'
  },
  devtool: 'source-map',
  context: path.resolve(__dirname, 'src'),

  entry: {
    app: ['./main.js'],
    vendor: ['preact', 'redux', 'react-router', 'preact-redux'],
  },

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

      'public': __dirname + '/src/public/',
      'fonts': __dirname + '/src/styles/fonts/',

      'react':    'preact-compat',
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
      test: /\.(png|jpg)$/,
      use: 'url-loader?limit=5000'
    },
    {
      test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      use: {
        loader: 'file-loader',
        options: {
          query: {
            name: path.join('fonts', '/[name].[ext]')
          }
        }
      }
    }
    ],

  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.js' }),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
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
  ]

};
