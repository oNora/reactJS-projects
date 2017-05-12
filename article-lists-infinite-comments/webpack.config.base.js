/**
 * Base webpack config used across other specific configs
 */
var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: path.join(__dirname, 'app'),
    output: {
        path: path.join(__dirname, 'public'),
        filename: "bundle-[hash].js"
    },
    module: {
        loaders: [{
            test: /\.json$/,
            loader: "json"
        },{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                presets: ['es2015', 'react']
            }
        }, {
            test: /\.css$/,
            loader: 'style!css'
        }, {
            test: /\.scss$/,
            loader: 'style!css!sass-loader'
        }, {
            test: /\.(jpg|png|gif|svg|cur|webp)$/,
            loader: 'file?name=images/[name].[ext]',
        }, {
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            loader: 'file?name=fonts/[name].[ext]',
        }]
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.css', '.scss']
    }
};