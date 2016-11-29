var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var validate = require('webpack-validator');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

const merge = require('webpack-merge');
const parts = require('./config/parts');
const pkg = require('./package.json');


var PATHS = {
  app: path.join(__dirname, 'app'),
  // style: path.join(__dirname, 'app', 'main.css'),
  build: path.join(__dirname, 'build'),
};

/*
 * Default webpack configuration for development
 */
var common = {
  entry: {
    app: PATHS.app,
  },
  output: {
    path: PATHS.build,
    filename: "[name].[chunkhash].js"
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['es2015', 'react']
      },

    }, {
      test: /\.(jpg|png|gif|svg)$/,
      loader: 'file?name=images/[name]-[hash:6].[ext]',
      // include: PATHS.images
    }, {
      test: /\.(woff|woff2|eot|ttf)$/,
      loader: 'file?name=fonts/[name].[ext]',
      // include: PATHS.fonts
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.css']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: require('html-webpack-template'),
      title: 'shared bookmarks',
      appMountId: 'root',
      inject: false
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
  ]
}

var config;

// Detect how npm is run and branch based on that
switch (process.env.npm_lifecycle_event) {
  case 'build':
    config = merge(
      common,
      parts.setEnvironment(),
      {
        devtool: 'source-map'
      },
      parts.clean(PATHS.build),
      parts.extractCSS(),
      parts.minify()
    );
    break;
  default:
    config = merge(
      common,
      {
        devtool: 'eval-source-map'
      },
      parts.extractCSS()
    );
}


module.exports = validate(config);
