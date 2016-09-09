var path = require('path');
var webpack = require('webpack');
var webpackDevServer = require('webpack-dev-server');
var HtmlWebpackPlugin = require('html-webpack-plugin')

var node_modules = path.resolve(__dirname, 'node_modules');
var pathToReact = path.resolve(node_modules, 'react/dist/react.min.js');
var pathToReactDom = path.resolve(node_modules, 'react-dom/dist/react-dom.min.js');

var baseConfig = require('./webpack.base.config')
var devServer = baseConfig.devServer
var publicConfig = baseConfig.publicConfig
baseConfig.scssLoader.unshift('style')

var config = {
    entry: [
        'webpack-dev-server/client?http://localhost:' + devServer.port,
        'webpack/hot/dev-server', 
        './src/main.js'
    ],
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    output: {
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            include: path.join(__dirname, 'src'),
            loaders: ['react-hot', 'babel'],
        }, {
            test: /\.css$/,
            loader: baseConfig.cssLoader.join('!')
        }, {
            test: /\.scss$/,
            loader: baseConfig.scssLoader.join('!')
        }, {
            test: /\.(png|jpg|gif|svg|woff2?|eot|ttf)(\?.*)?$/,
            loader: 'url',
            query: {
              limit: publicConfig.fileLimit,
              name: publicConfig.publicIMGPath + '/[name].[ext]'
            }
        }],
        noParse: [pathToReact, pathToReactDom]
    },
    devServer: devServer,
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: 'index.html',
            inject: true
        })
    ]
};

module.exports = config;