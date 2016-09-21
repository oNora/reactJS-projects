const parts = require('./config/parts');
var pkg = require('./package.json');

// var webpack = require('webpack');
var path = require('path');

var merge = require('webpack-merge');
var HtmlWebpackPlugin = require('html-webpack-plugin')
var validate = require('webpack-validator');

var PATHS = {
  app:  path.join(__dirname, 'app').replace(/^([A-Z]:)/, function(v) { return v.toLowerCase(); } ),
  style: path.join(__dirname, 'app', 'main.css').replace(/^([A-Z]:)/, function(v) { return v.toLowerCase(); } ),
  build: path.join(__dirname, 'dist').replace(/^([A-Z]:)/, function(v) { return v.toLowerCase(); } ),
  vendors: path.join(__dirname, 'app', 'vendor.js').replace(/^([A-Z]:)/, function(v) { return v.toLowerCase(); } )
};

var common = {
  entry: {
    app: PATHS.app,
    style: PATHS.style,
    // vendor: Object.keys(pkg.dependencies)
    // vendor: PATHS.vendors
  },
  output: {
    path: PATHS.build,
    filename: "[name].[chunkhash].js"
  },
  resolve: {
    extensions: ['', '.js'],
    alias: {
      scrollmagic: path.join(__dirname, 'node_modules/scrollmagic/scrollmagic/uncompressed/').toLowerCase()
    }
  },
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"},
      // { test: /\.css$/, loader: "style-loader!css-loader" }
    ]
  },
  plugins: [
      new HtmlWebpackPlugin({
          template: require('html-webpack-template'),
          title: 'webpack-config',
          appMountId: 'example',
          inject: false
      }),
    ]
};

var config;

// Detect how npm is run and branch based on that
switch(process.env.npm_lifecycle_event) {
  case 'build':
    config = merge(
        common,
        {
            devtool: 'source-map'
        },
        parts.clean(PATHS.build),
        parts.setFreeVariable(
            'process.env.NODE_ENV',
            'production'
        ),
        // parts.extractBundle({
        //   name: 'vendor',
        //   entries: Object.keys(pkg.dependencies)
        // }),
        parts.minify(),
        // parts.setupCSS(PATHS.app)
        // parts.extractCSS(PATHS.app)
        parts.extractCSS(PATHS.style)
    );
    break;
  default:
    config = merge(
      common,
      {
        devtool: 'source-map'
      },
      // parts.setupCSS(PATHS.app)
      parts.extractCSS(PATHS.style)
    );
}

module.exports = validate(config);