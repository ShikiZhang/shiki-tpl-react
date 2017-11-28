var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var path = require('path');

module.exports = {

    entry: {
        index: './src/js/index.jsx',

    },

    output: {
        path: path.resolve('dist'),
        filename: 'js/[name].bundle.js',
        chunkFilename: 'js/[name].bundle.js'
    },

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.(scss|css)/,
                loader: ExtractPlugin.extract({ fallback: 'style-loader', use: 'css-loader!sass-loader' })
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: 'url-loader?limit=1000&name=./img/[name].[ext]'
            },
            {
                test: /\.json/,
                loader: 'json-loader'
            }
        ]
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'STATIC_ENV': JSON.stringify(false)
            }
        }),
        // new webpack.ProvidePlugin({
        //   mping: 'lib/mping',
        // 		Promise: 'promise-polyfill'
        // }),
        new HtmlWebpackPlugin({
            filename: './index.html', //相对publicPath
            template: './src/index.html',  //相对config
            inject: 'body',
            hash: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }),
        new CopyWebpackPlugin([{
            from: './src/img',
            to: 'img',
            ignore: ['.gitkeep']
        }]),
        new ExtractPlugin('css/[name].bundle.css')
    ],
    resolve: {
        extensions: ['.js', '.jsx']
    },
    devtool: 'source-map'
}
