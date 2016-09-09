var process = require('process');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var config = {
    autoprefixer: {
        auto: true, //是否自动前缀
        version: '[">0.1%"]', //自动前缀版本
    },
    devServer: {
        port: 9000, //调试端口号
        hot: process.argv.indexOf('--hotreload')>-1, //是否使用react-hot-loader，false时全页面刷新
        colors: true,
        inline:true,
        progress: true,
        autoprefixer: true,
    },
    publicConfig: {
        minify: false,  //是否压缩html页面
        publicPath: '', //发布路径，例如cdn
        publicJSPath: '/js', //js路径
        publicCSSPath: '/css',   //css路径
        publicIMGPath: '/img',   //资源路径
        fileLimit: 20,       //图片或字体设置，小于fileLimit会自动转成base64
    },
}

config.extractCSS = new ExtractTextPlugin(config.publicConfig.publicCSSPath + '/[name].css');
config.cssLoader = ['style', 'css']
config.scssLoader = ['css', 'sass']
if(config.autoprefixer.auto){
    var _loader = 'autoprefixer?{browsers:'+ config.autoprefixer.version +'}'
    config.cssLoader.push(_loader)
    config.scssLoader.push(_loader)
}

if(config.publicConfig.minify){
    config.publicConfig.minify = {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
    }
}

module.exports = config