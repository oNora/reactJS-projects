const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const validate = require('webpack-validator');
const parts = require('./config/parts');
const pkg = require('./package.json');

// Got the information from here https://github.com/webpack/webpack/issues/2362
// mkontula and jlroettger
// to get rid of WARNING
// There are multiple modules with names that only differ in casing.
// instead this
// const PATHS = {
//   app: path.join(__dirname.toLowerCase(), 'app'),
//   build: path.join(__dirname.toLowerCase(), 'build')
// };
// use this
const PATHS = {
  app:  path.join(__dirname, 'app').replace(/^([A-Z]:)/, function(v) { return v.toLowerCase(); } ),
  style: path.join(__dirname, 'app', 'main.css').replace(/^([A-Z]:)/, function(v) { return v.toLowerCase(); } ),

  build: path.join(__dirname, 'build').replace(/^([A-Z]:)/, function(v) { return v.toLowerCase(); } )
};

const common = {
  // Entry accepts a path or an object of entries.
  // We'll be using the latter form given it's
  // convenient with more complex configurations.
  entry: {
    app: PATHS.app,
    style: PATHS.style,
    vendor: Object.keys(pkg.dependencies)
  },
  output: {
    path: PATHS.build,
    filename: '[name].[chunkhash].js'
  },
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
    ]
  },
  // Important! Do not remove ''. If you do, imports without
  // an extension won't work anymore!
  resolve: {
    extensions: ['', '.js']
  },
  plugins: [
    new HtmlWebpackPlugin({   // automatically generate of a index.html
        template: require('html-webpack-template'),
        title: 'webpack-config',
        appMountId: 'app',
        inject: false
    })
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
        parts.extractBundle({
          name: 'vendor',
          entries: Object.keys(pkg.dependencies)
        }),
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