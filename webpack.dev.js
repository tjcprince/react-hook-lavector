// webpack.dev.js
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base')
const path = require('path')

const devConfig = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    hot: true, //热更新
    open: true, //编译完自动打开浏览器
    compress: true, //开启gzip压缩
    port: 3000, //开启端口号
    historyApiFallback: true,
    static: {
      //托管静态资源文件
      directory: path.join(__dirname, './public'),
    },
    client: {
      //在浏览器端打印编译进度
      progress: true,
    },
  },
}

module.exports = merge(devConfig, baseConfig)
