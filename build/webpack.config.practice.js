const path = require('path')
// https://webpack.docschina.org/plugins/html-webpack-plugin/
const HTMLWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
// 会根据
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
// 只用于client端渲染
const defaultPlugins = [
  new HTMLWebpackPlugin({
    template: path.join(__dirname, './template.html')
  })
]

const devServer = {
  port: '9000',
  // 支持localhost / ip进行访问
  host: '0.0.0.0',
  overlay: {
    errors: true
  },
  hot: true
}

let config = merge(baseConfig, {
  entry: path.join(__dirname, '../practice/index.js'),
  // webpack 4 默认指定
  // devtool: '#inline-source-map',
  devServer,
  resolve: {
    alias: {
      // 指定import的vue 文件本身位置，使用vue.esm.js而不是runtime版本是便于我们在Vue组件中书写template，便于测试
      'vue': path.join(__dirname, '../node_modules/vue/dist/vue.esm.js')
    }
  },
  module: {
    rules: [{
      test: /\.styl(us)?$/,
      use: [
        // https://segmentfault.com/q/1010000004579566
        // style-loader 会将css-loader处理完毕的css，解析到webpack生成的bundle中，以js的形式写到html的style标签中
        // 'style-loader',
        'vue-style-loader',
        // css-loader 是处理css文件中的url()等
        'css-loader',
        // {
        //   loader: 'css-loader',
        //   options: {
        //     // 指定开启css module，针对import的css使用该功能
        //     // 参考footer.jsx的引入方式
        //     modules: true,
        //     localIdentName: isDev ? '[path][name]-[hash:base64:5]' : '[hash:base64:5]'
        //   }
        // },
        {
          // https://www.ibm.com/developerwoherks/cn/web/1604-postcss-css/index.html
          // 使用postcss，具体配置在postcss.config.js中
          // PostCSS 的主要功能只有两个：第一个就是前面提到的把 CSS 解析成 JavaScript 可以操作的 AST，第二个就是调用插件来处理 AST 并得到结果。
          // Autoprefixer: https://www.ibm.com/developerworks/cn/web/1604-postcss-css/index.html
          loader: 'postcss-loader',
          options: {
            // 直接使用stylus-loader生成的css，提高编译速度
            sourceMap: true
          }
        },
        // 是将stylus文件编译成css
        'stylus-loader'
      ]
    }]
  },
  plugins: defaultPlugins.concat([
    // 启用模块热替换(Enable Hot Module Replacement - HMR)
    new webpack.HotModuleReplacementPlugin()
    // webpack4 自动根据mode配置
    // https://webpack.docschina.org/concepts/mode
    // new webpack.NoEmitOnErrorsPlugin()
  ])
})

module.exports = config
