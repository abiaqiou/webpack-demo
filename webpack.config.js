const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  // 入口文件位置
  entry: './src/index.js',

  // 一个 chunk，一个 bundle
  // entry: ['./src/index.js', './src/main.js']

  // 多个 chunk，多个 bundle
  // entry: {
  //   bundle0: './src/index.js',
  //   bundle1: './src/main.js',
  // }

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
      template: './src/index.html',
      // filename: 'index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
      },
    }),
  ],

  // 打包模式，开发与生产这两种模式都会自动启用一些插件
  mode: 'development',
}
