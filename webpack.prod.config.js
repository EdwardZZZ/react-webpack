require('shelljs/global')
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin')

var baseConfig = require('./webpack.base.config')
var publicConfig = baseConfig.publicConfig
var extractCSS = baseConfig.extractCSS

var config = {
    entry: {
        app: './src/main.js',
        vendors: ['react', 'react-dom']
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    output: {
        publicPath: publicConfig.publicPath,
        path: path.resolve(__dirname, 'build'),
        filename: publicConfig.publicJSPath + '/[name].js'
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            include: path.join(__dirname, 'src'),
            loader: 'babel',
        }, {
            test: /\.css$/,
            loader: baseConfig.cssLoader.join('!')
        }, {
            test: /\.scss$/,
            loader: extractCSS.extract(baseConfig.scssLoader)
        }, {
            test: /\.(png|jpg|gif|svg|woff2?|eot|ttf)(\?.*)?$/,
            loader: 'url',
            query: {
              limit: publicConfig.fileLimit,
              name: publicConfig.publicIMGPath + '/[name].[ext]'
            }
        }]
    },
    plugins: [
        extractCSS,
        new webpack.optimize.CommonsChunkPlugin('vendors', publicConfig.publicJSPath + '/vendors.js'),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true,
            minify: publicConfig.minify,
            chunksSortMode: 'dependency'
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin()
    ]
};


var assetsPath = path.resolve(__dirname, './build')
rm('-rf', assetsPath)
mkdir('-p', assetsPath)
cp('-R', 'static/', assetsPath)


module.exports = config;
