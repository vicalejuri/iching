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
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

var path = require('path');
var node_modules = path.resolve(__dirname, 'node_modules');

var pathToMaterialUI = path.resolve(node_modules, 'material-ui');
var pathToReact = path.resolve(node_modules, 'react');
var pathToRedux = path.resolve(node_modules, 'redux-devtools');
var pathToReactRedux = path.resolve(node_modules, 'preact-redux');


module.exports = {
  devServer: {
    host: '0.0.0.0',
    publicPath: '/assets/',
    contentBase: path.resolve(__dirname, 'src'),
    watchContentBase: true,

    progress: true,
    hot: true,
    compress: true,

    watchOptions: {
      ignored: 'node_modules'
    },
    stats: {
      colors: true
    },
  },

  output: {
    path: assetPath,
    filename: '[name].js',
    publicPath: '/assets/'
  },

  devtool: 'sourcemap',

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

      'react': 'preact-compat',
      'react-dom': 'preact-compat'
    }
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
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
      /*
      { test: /\.scss/,
        use: ['style-loader','css-loader','postcss-loader?importLoaders=1',], //ExtractTextPlugin.extract('style',['css','postcss?importLoaders=1']),
      },
      */
      { test: /\.css$/,
        use: ['style-loader','css-loader','postcss-loader?importLoaders=1'], //ExtractTextPlugin.extract("css-loader")
      },
      {
        test: /\.(png|jpg)$/,
        use: 'url-loader?limit=500000'
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
      },
    ],
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.js' }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    //new BundleAnalyzerPlugin({}),

    //new webpack.NoErrorsPlugin(),
    //new ExtractTextPlugin('fonts.css'),
    new ExtractTextPlugin('main.css'),
    new webpack.DefinePlugin({
      __DEVELOPMENT__: true,
      __DEVTOOLS__: true
    }),

  ]

};
