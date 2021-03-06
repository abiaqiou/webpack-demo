const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')
const EslintWebpackPlugin = require('eslint-webpack-plugin')

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
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.less$/,
        // less-loader 将 less 语句转译为 css 语句
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.scss$/,
        // sass-loader 将 sass 语句转译为 css 语句
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.(jpg|jpeg|png|gif)$/,
        // 处理在 css 中引入图片的 loader
        loader: 'url-loader',
        options: {
          // 小于该值时会执行 base64 编码
          limit: 1024 * 10,
          // 相对于打包目录的路径
          outputPath: './images',
          // publicPath: '../images',
          name: '[name][hash:10].[ext]',
        },
      },
      {
        test: /\.html$/,
        // 处理 html 中引入的图片
        loader: 'html-loader',
      },
      {
        exclude: /\.(js|json|html|css|less|scss|jpg|jpeg|png|gif)$/,
        loader: 'file-loader',
        options: {
          outputPath: 'font',
          publicPath: './font',
          name: '[name][hash:4].[ext]',
        },
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

    // 提取各个 style 标签里的 css 代码到一个文件中, 插入 link 标签到 html 文件中。 需配合自身 loader 方法使用
    new MiniCssExtractPlugin({
      filename: 'main.css',
    }),

    // 默认去除空格和注释
    // new OptimizeCssAssetsWebpackPlugin(),
    new CssMinimizerWebpackPlugin(),

    new EslintWebpackPlugin(),
  ],

  // 打包模式，开发与生产这两种模式都会自动启用一些插件
  mode: 'development',

  // webpack5 需要的配置项，用于自动刷新?
  // target: 'web',
  devServer: {
    port: 2000,
    compress: true,
    open: true,
  },
}
