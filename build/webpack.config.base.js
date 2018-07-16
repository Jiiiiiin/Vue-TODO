const path = require('path')
// https://vue-loader.vuejs.org/zh/guide/#手动配置
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const createVueLoaderOptions = require('./vue-loader.config')
// 通过package script中设置环境变量
const isDev = process.env.NODE_ENV === 'development'

const config = {
  // https://webpack.docschina.org/configuration/
  // 提供 mode 配置选项，告知 webpack 使用相应模式的内置优化。
  mode: process.env.NODE_ENV || 'production',
  target: 'web',
  entry: path.join(__dirname, '../client/index.js'),
  output: {
    // https://juejin.im/post/5ae9ae5e518825672f19b094
    // publicPath: '/pmobile/',
    filename: 'bundle.[hash:8].js',
    path: path.join(__dirname, '../dist')
  },
  module: {
    rules: [{
      test: /\.(vue|js|jsx)$/,
      loader: 'eslint-loader',
      exclude: /node_modules/,
      enforce: 'pre'
    },
    {
      test: /\.vue$/,
      use: [{
        loader: 'vue-loader',
        options: createVueLoaderOptions(isDev)
      }]
    },
    {
      test: /\.special\.json$/,
      type: 'javascript/auto',
      use: 'special-loader'
    },
    {
      test: /\.jsx$/,
      loader: 'babel-loader'
    },
    {
      test: /\.js$/,
      loader: 'babel-loader',
      // 一般的lib都是大包过的，这里是一个优化
      exclude: /node_modules/
    },
    {
      // https://vue-loader.vuejs.org/zh/guide/pre-processors.html#typescript
      test: /\.pug$/,
      loader: 'pug-plain-loader'
    },
      // {
      //   test: /\.css$/,
      //   use: [
      //     // style-loader 会将css-loader处理完毕的css，解析到webpack生成的bundle中，以js的形式写到html的style标签中
      //     'style-loader',
      //     'css-loader'
      //   ]
      // },
    {
      test: /\.(jpg|png|svg)$/,
      use: [{
        // https://vue-loader.vuejs.org/zh/guide/asset-url.html#转换规则
        // url-loader 允许你有条件地将文件转换为内联的 base-64 URL (当文件小于给定的阈值)，这会减少小文件的 HTTP 请求数。如果文件大于该阈值，会自动的交给 file-loader 处理。
        loader: 'url-loader',
        options: {
          limit: 1024,
          // 生成到和开发时候相同的path
          name: 'recources/[path][name].[hash:8].[ext]'
        }
      }]
    }
    ]
  },
  // https://webpack.docschina.org/plugins/
  plugins: [
    // make sure to include the plugin!
    new VueLoaderPlugin()
  ]
}

module.exports = config
