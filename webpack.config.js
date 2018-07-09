const path = require('path')
// https://vue-loader.vuejs.org/zh/guide/#手动配置
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  entry: path.join(__dirname, 'src/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist')
  },
  module: {
    rules: [{
      test: /\.vue$/,
      loader: 'vue-loader'
    }, {
      test: /\.css$/,
      use: [
        // style-loader 会将css-loader处理完毕的css，解析到webpack生成的bundle中，以js的形式写到html的style标签中
        'style-loader',
        'css-loader'
      ]
    }, {
      test: /\.styl$/,
      use: [
        // style-loader 会将css-loader处理完毕的css，解析到webpack生成的bundle中，以js的形式写到html的style标签中
        'style-loader',
        'css-loader',
        'stylus-loader'
      ]
    }, {
      test: /\.(jpg|png)$/,
      use: [{
        // url-loader 允许你有条件地将文件转换为内联的 base-64 URL (当文件小于给定的阈值)，这会减少小文件的 HTTP 请求数。如果文件大于该阈值，会自动的交给 file-loader 处理。
        loader: 'url-loader',
        options: {
          limit: 1024,
          name: '[name]-urlloader.[ext]'
        }
      }]
    }]
  },
  plugins: [
    // make sure to include the plugin!
    new VueLoaderPlugin()
  ]
}
