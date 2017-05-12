var webpack = require('webpack');
var validate = require('webpack-validator');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var merge = require('webpack-merge');
var path = require('path');

var baseConfig = require('./webpack.config.base');

var config = merge(baseConfig, {
  devtool: 'eval-source-map',
  plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "/app/index.tmpl.html")
        }),
        new webpack.DefinePlugin({
            __DEV__: JSON.parse('true'),
            __PRODUCTION__: JSON.parse('false'),
        })
    ],
    devServer: {
        contentBase: "./public",
        host: '0.0.0.0',
        port: '8000',
        // colors: true,
        historyApiFallback: true,
        inline: true
    }
});

// module.exports = config;
module.exports = validate(config);