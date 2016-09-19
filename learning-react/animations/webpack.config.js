var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin')
var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/app/index.html',
  filename: 'index.html',
  inject: 'body'
});

module.exports = {
  entry: {
    app: './app/index.js'
    // vendor: ['jquery', 'gsap', 'scrollmagic']
  },
  output: {
    path: __dirname + '/dist',
    filename: "index_bundle.js"
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    root: path.resolve(path.join(__dirname, 'src')),
    alias: {
      scrollmagic: path.resolve(path.join(__dirname, 'node_modules/scrollmagic/scrollmagic/uncompressed/'))
    }
  },
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"},
      { test: /\.css$/, loader: "style-loader!css-loader" }
    ]
  },
  
  plugins: [
    HTMLWebpackPluginConfig,
     new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"vendor.bundle.js")
    ]
};
