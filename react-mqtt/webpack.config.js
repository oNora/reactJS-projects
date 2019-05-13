const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const PATHS = {
    app: path.join(__dirname, 'app'),
    build: path.join(__dirname, 'build'),
};

module.exports = {
    entry: {
        app: PATHS.app,
    },
    devtool: 'eval-source-map', // only for dev
    output: {
        path: PATHS.build,
        filename: '[name].js',
    },
    module: {
        rules: [{
                test: /\.js$/,
                use: 'babel-loader',
                exclude: [/node_modules/]
            },
            {
                test: /\.jsx$/,
                use: 'babel-loader',
                exclude: [/node_modules/]
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader", // creates style nodes from JS strings
                    "css-loader", // translates CSS into CommonJS
                    "sass-loader" // compiles Sass to CSS, using Node Sass by default
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css', '.scss']
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "/app/index.tmpl.html")
        }),
        // this will be need in prod mode
        // new webpack.DefinePlugin({
        //     'process.env': {
        //         NODE_ENV: JSON.stringify('production')
        //     }
        // }),
    ],
    devServer: {
        // contentBase: "./public",
        host: '0.0.0.0',
        port: '8000',
        // colors: true,
        // historyApiFallback: true,
        inline: true
    }
};