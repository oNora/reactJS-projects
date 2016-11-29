const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

exports.minify = function() {
  return {
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        },
        // Mangling specific options
        mangle: {
            // Don't mangle $
            except: ['$'],
            // Don't care about IE8
            screw_ie8 : true,
            // Don't mangle function names
            keep_fnames: true
        }
      })
    ]
  };
}

exports.clean = function(path) {
  return {
    plugins: [
      new CleanWebpackPlugin([path], {
        // Without `root` CleanWebpackPlugin won't point to our
        // project and will fail to work.
        root: process.cwd()
      })
    ]
  };
}

exports.extractCSS = function(paths) {
  return {
    module: {
      loaders: [
        // enable css modules
        {
            test: /\.css$/,
            exclude: /node_modules/,
            loader: ExtractTextPlugin.extract('style', 'css?modules')
        }, 
        // loading bootstrap css and disable css modules
        {
            test: /\.css$/,
            include: /node_modules/,
            loader: ExtractTextPlugin.extract('style', 'css')
        }
      ]
    },
    plugins: [
      // Output extracted CSS to a file
      new ExtractTextPlugin('[name].[chunkhash].css')
    ]
  };
}
