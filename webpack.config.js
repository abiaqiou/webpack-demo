const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  // 入口文件位置
  // entry: './src/index.js',

  // 一个 chunk，一个 bundle
  // entry: ['./src/index.js', './src/main.js']

  // 多个 chunk，多个 bundle
  entry: {
    vendor: ['./src/js/jquery.js', './src/js/common.js'],
    bundle0: './src/js/multiple0.js',
    bundle1: './src/js/multiple1.js',
  },

  // 出口文件位置
  output: {
    filename: '[name].js',
    path: resolve(__dirname, 'dist'),
  },

  // loader，让 Webpack 能够处理其它资源如 css img 等，Webpack 默认只能处理 js 和 json
  module: {
    rules: [],
  },

  // 插件，执行范围更广的任务
  plugins: [
    // 创建一个新的 html 文件，自动引入 bundle
    new HtmlWebpackPlugin({
      // 新的 html 文件会复制 template 中的内容
      template: './src/multiple0.html',
      filename: 'm0.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
      },
      // 引入部分 chunk，不指定的话会引入全部
      chunks: ['bundle0', 'vendor'],
    }),
    new HtmlWebpackPlugin({
      // 新的 html 文件会复制 template 中的内容
      template: './src/multiple1.html',
      filename: 'm1.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
      },
      // 引入部分 chunk，不指定的话会引入全部
      chunks: ['bundle1', 'vendor'],
    }),
  ],

  // 打包模式，开发与生产这两种模式都会自动启用一些插件
  mode: 'development',
}
