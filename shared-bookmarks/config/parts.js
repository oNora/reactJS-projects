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

// exports.extractBundle = function(options) {
//   const entry = {};
//   entry[options.name] = options.entries;

//   return {
//     // Define an entry point needed for splitting.
//     entry: entry,
//     plugins: [
//       // Extract bundle and manifest files. Manifest is
//       // needed for reliable caching.
//       new webpack.optimize.CommonsChunkPlugin({
//         names: [options.name, 'manifest']
//       })
//     ]
//   };
// }


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
        // Extract CSS during build
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract('style', 'css'),
          include: paths
        }
      ]
    },
    plugins: [
      // Output extracted CSS to a file
      new ExtractTextPlugin('[name].[chunkhash].css')
    ]
  };
}