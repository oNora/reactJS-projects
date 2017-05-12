var webpack = require('webpack');
var validate = require('webpack-validator');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var merge = require('webpack-merge');
var path = require('path');

var baseConfig = require('./webpack.config.base');

var config = merge.smartStrategy(
  {
    entry: 'append',
    'module.loaders': 'replace'
  }
)(baseConfig, {
    devtool: 'source-map',
    loader: [
        {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract('style', 'css!sass-loader'),
        }
    ],
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "/app/index.tmpl.html")
        }),
        new webpack.DefinePlugin({
            __DEV__: JSON.parse('false'),
            __PRODUCTION__: JSON.parse('true'),
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            // Mangling specific options
            mangle: {
                // Don't mangle $
                except: ['$'],
                // Don't care about IE8
                screw_ie8: true,
                // Don't mangle function names
                keep_fnames: true
            }
        }),
        new ExtractTextPlugin("style-[chunkhash].css"),
        new CleanWebpackPlugin([path.join(__dirname, 'public')], {
            // Without `root` CleanWebpackPlugin won't point to our
            // project and will fail to work.
            root: process.cwd()
        })
    ]
});

// module.exports = config;
module.exports = validate(config);