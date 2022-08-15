// scripts/webpack.base.js
const path = require('path')

const webpack = require('webpack')

//将 CSS 提取到单独的文件中
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const htmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  entry: {
    main: path.resolve(__dirname, 'src/index.tsx'),
  },

  output: {
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].js',
    path: path.resolve(__dirname, './dist'),
    clean: true,
    publicPath: '/',
  },

  resolve: {
    alias: {
      '@src': path.resolve(__dirname, 'src'),
    },
    mainFiles: ['index', 'main'],
    extensions: ['.ts', '.tsx', '.scss', 'json', '.js', 'css', 'jsx'],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },

  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        use: 'babel-loader',
      },
      {
        test: /\.(sa|sc|c|le)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          'postcss-loader',
          {
            loader: 'resolve-url-loader',
            options: {
              keepQuery: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'less-loader', // compiles Less to CSS
            options: {
              lessOptions: {
                // 如果使用less-loader@5，请移除 lessOptions 这一级直接配置选项。
                modifyVars: {
                  'primary-color': '#1DA57A',
                  'link-color': '#1DA57A',
                  'border-radius-base': '2px',
                },
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|svg|gif)$/,
        type: 'asset/inline',
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[hash][ext][query]',
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'assets/[name].[contenthash].css',
    }),
    new webpack.ProgressPlugin(), //进度条
    new htmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, './public/index.html'),
    }),
    new CleanWebpackPlugin(),
  ],
}
