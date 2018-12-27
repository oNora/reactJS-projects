var webpack = require('webpack');
var validate = require('webpack-validator');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var path = require('path');
var PATHS = {
    app: path.join(__dirname, 'app'),
    style: path.join(__dirname, 'app', 'main.css'),
    build: path.join(__dirname, 'build'),
    images: path.join(__dirname, 'images'),
    fonts: path.join(__dirname, 'fonts')
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
            // loader: 'style!css'
            loader: 'style!css?modules'
        }, {
            test: /\.(jpg|png|gif|svg)$/,
            loader: 'file?name=images/[name]-[hash:6].[ext]',
            include: PATHS.images
        }, {
            test: /\.(woff|eot|ttf)$/,
            loader: 'file?name=fonts/[name].[ext]',
            include: PATHS.fonts
        }]
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.css']
    },
    plugins: [
        new HtmlWebpackPlugin({
            // template: __dirname + "/app/index.tmpl.html"
            template: require('html-webpack-template'),
            title: 'webpack config 2',
            appMountId: 'root',
            inject: false
        }),
        new webpack.optimize.OccurenceOrderPlugin()
    ],
    devServer: {
        contentBase: "./public",
        //colors: true, // с добавянето на validate тук гърми грешка
        //  stats: { colors: true },
        host: '0.0.0.0',
        port: '8000',
        historyApiFallback: true,
        inline: true
    }
}

module.exports = validate(config);