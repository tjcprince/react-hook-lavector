const path = require('path')
// 它将bundle内容展示为一个便捷的、交互式、可缩放的树状图形式。方便我们更直观了解代码的分离
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base')

const prodConfig = {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new WebpackManifestPlugin(),
    // new BundleAnalyzerPlugin()
  ],
}

module.exports = merge(prodConfig, baseConfig)
