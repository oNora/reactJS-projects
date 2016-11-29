var webpack = require('webpack');
var validate = require('webpack-validator');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

var path = require('path');
var PATHS = {
    app: path.join(__dirname, 'app'),
    build: path.join(__dirname, 'build')
};

var config = {
    devtool: 'source-map',
    entry: PATHS.app,
    output: {
        path: PATHS.build,
        filename: "[name]-[hash].js"
    },
    module: {
        loaders: [{
            test: /\.json$/,
            loader: "json"
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel'
        }, {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract('style', 'css!sass-loader'),
        }, {
            test: /\.(jpg|png|gif|svg)$/,
            loader: 'file?name=images/[name]-[hash].[ext]',
        }, {
            test: /\.(woff|woff2|eot|ttf)$/,
            loader: 'file?name=fonts/[name].[ext]',
        }]
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.css']
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: __dirname + "/app/index.tmpl.html"
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
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new ExtractTextPlugin("style-[chunkhash].css"),
        new CleanWebpackPlugin([PATHS.build], {
            // Without `root` CleanWebpackPlugin won't point to our
            // project and will fail to work.
            root: process.cwd()
        })
    ],
}

module.exports = validate(config);