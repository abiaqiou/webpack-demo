const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  // 入口文件位置
  entry: './src/index.js',

  // 一个 chunk，一个 bundle
  // entry: ['./src/index.js', './src/main.js']

  // 多个 chunk，多个 bundle
  // entry: {
  //   vendor: ['./src/js/jquery.js', './src/js/common.js'],
  //   bundle0: './src/js/multiple0.js',
  //   bundle1: './src/js/multiple1.js',
  // },

  // 出口文件位置
  output: {
    filename: '[name].js',
    path: resolve(__dirname, 'dist'),
  },

  // loader，让 Webpack 能够处理其它资源如 css img 等，Webpack 默认只能处理 js 和 json
  module: {
    rules: [
      {
        test: /\.css$/,
        // style-loader 生成 js 代码, 运行后新增 style 标签
        // css-loader 读取 css 文件内容到 js 中
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.less$/,
        // less-loader 将 less 语句转译为 css 语句
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
    ],
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
      // 引入部分 chunk，不指定的话会引入全部
      // chunks: ['bundle0', 'vendor'],
    }),
  ],

  // 打包模式，开发与生产这两种模式都会自动启用一些插件
  mode: 'development',
}
