var webpack = require('webpack');
var validate = require('webpack-validator');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var path = require('path');
var PATHS = {
    app: path.join(__dirname, 'app'),
    build: path.join(__dirname, 'build'),
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
            test: /\.css$/,
            loader: 'style!css?modules'
        },{
            test: /\.scss$/,
            loader: 'style!css!sass-loader'
        }, {
            test: /\.(jpg|png|gif|svg)$/,
            loader: 'file?name=images/[name]-[hash:6].[ext]',
        }, {
            test: /\.(woff|woff2|eot|ttf)$/,
            loader: 'file?name=fonts/[name].[ext]',
        }]
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.css', '.scss']
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: __dirname + "/app/index.tmpl.html"
        }),
        new webpack.optimize.OccurenceOrderPlugin()
    ],
    devServer: {
        contentBase: "./public",
        //colors: true, // с добавянето на validate тук гърми грешка
        //  stats: { colors: true },
        historyApiFallback: true,
        inline: true
    }
}

module.exports = validate(config);