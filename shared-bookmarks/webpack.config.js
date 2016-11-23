var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var validate = require('webpack-validator');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

const merge = require('webpack-merge');
const parts = require('./config/parts');
const pkg = require('./package.json');


var PATHS = {
  app:  path.join(__dirname, 'app'),
  style: path.join(__dirname, 'app', 'main.css'),
  build: path.join(__dirname, 'public'),
};

/*
 * Default webpack configuration for development
 */
var common = {
  // devtool: 'eval-source-map',
  devtool: 'source-map',
  entry: {
      app: PATHS.app,
      style: PATHS.style
      // vendor: ['react']
  },
  output: {
    path: __dirname + "/public",
    filename: "[name].[chunkhash].js"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015','react']
        },
        
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css'),
        include: PATHS.style
      },
      // { test: /\.css$/, loader: "style-loader!css-loader", exclude: /node_modules/ },
      // {test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/, loader: 'file', exclude: /node_modules/},
      // {test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
      // {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
      // {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
      // {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" }
    ]
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
      new ExtractTextPlugin('[name].[chunkhash].css')
    ]
}

var config;

// Detect how npm is run and branch based on that
switch(process.env.npm_lifecycle_event) {
  case 'build':
    config = merge(
        common,
        parts.clean(PATHS.build),
        parts.minify()
    );
    break;
  default:
    config = merge(
      common
    );
}


module.exports = validate(config);