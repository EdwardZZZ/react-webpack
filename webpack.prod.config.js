require('shelljs/global')
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin')

var publicConfig = {
    publicPath: '',
    publicJSPath: 'js',
    publicCSSPath: 'css',
    publicIMGPath: 'img',
    fileLimit: 20000,       //图片或字体设置，小于fileLimit会自动转成base64
}

var extractCSS = new ExtractTextPlugin(publicConfig.publicCSSPath + '/[name].css');
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
            loader: 'style!css'
        }, {
            test: /\.scss$/,
            loader: extractCSS.extract(['css', 'sass'])
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
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            },
            chunksSortMode: 'dependency'
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                dead_code: true,
                unused: true
            },
        }),
        new webpack.optimize.OccurenceOrderPlugin()
    ]
};


var assetsPath = path.resolve(__dirname, './build')
rm('-rf', assetsPath)
mkdir('-p', assetsPath)
cp('-R', 'static/', assetsPath)


module.exports = config;
