var htmlWebpackPlugin = require('html-webpack-plugin')
var webpack = require("webpack")
var path = require("path")
module.exports = {
    entry: {
        main : __dirname + "/src/index.js"
    }, //已多次提及的唯一入口文件
    output: {
        path: __dirname + "/dist",//打包后的文件存放的地方
        filename: "js/[name].js",//打包后输出文件的文件名
    },
    plugins:[
        new htmlWebpackPlugin({
            template:'index.html',  //
            include:['main']
        }),
        new webpack.HotModuleReplacementPlugin(),//开启热加载

    ],
    module:{        //支持各种写法
        rules:[
            {
                test:/\.styl$/,
                use:[
                    'style-loader',
                    'css-loader',
                    'stylus-loader'
                ]
            },
            {
                test:/\.vue$/,
                use:[
                    'vue-loader'
                ]
            }
        ]
    },
    resolve: {
        alias: {
            vue: 'vue/dist/vue.js',
        },
        extensions: ['.js', '.json', '.vue', '.scss', '.css']
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9000,
        historyApiFallback: true,
        noInfo: true,
        overlay: true
    },
    performance: {
        hints: false
    },
    devtool: '#eval-source-map'
}