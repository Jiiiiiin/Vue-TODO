const path = require('path')
// https://vue-loader.vuejs.org/zh/guide/#手动配置
const VueLoaderPlugin = require('vue-loader/lib/plugin')
// https://webpack.docschina.org/plugins/html-webpack-plugin/
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
// 通过package script中设置环境变量
const isDev = process.env.NODE_ENV == 'development'

const config = {
  target: 'web',
  entry: path.join(__dirname, 'src/index.js'),
  output: {
    // https://juejin.im/post/5ae9ae5e518825672f19b094
    // publicPath: '/pmobile/',
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist')
  },
  module: {
    rules: [{
        test: /\.vue$/,
        loader: 'vue-loader'
      }, {
        test: /\.jsx$/,
        loader: 'babel-loader'
      }, {
        // https://vue-loader.vuejs.org/zh/guide/pre-processors.html#typescript
        test: /\.pug$/,
        loader: 'pug-plain-loader'
      }, {
        test: /\.css$/,
        use: [
          // style-loader 会将css-loader处理完毕的css，解析到webpack生成的bundle中，以js的形式写到html的style标签中
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.styl(us)?$/,
        use: [
          // https://segmentfault.com/q/1010000004579566
          // style-loader 会将css-loader处理完毕的css，解析到webpack生成的bundle中，以js的形式写到html的style标签中
          'style-loader',
          // css-loader 是处理css文件中的url()等
          'css-loader',
          {
            // https://www.ibm.com/developerworks/cn/web/1604-postcss-css/index.html
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
      },
      {
        test: /\.(jpg|png|svg)$/,
        use: [{
          // https://vue-loader.vuejs.org/zh/guide/asset-url.html#转换规则
          // url-loader 允许你有条件地将文件转换为内联的 base-64 URL (当文件小于给定的阈值)，这会减少小文件的 HTTP 请求数。如果文件大于该阈值，会自动的交给 file-loader 处理。
          loader: 'url-loader',
          options: {
            limit: 1024,
            name: '[name]-urlloader.[ext]'
          }
        }]
      }
    ]
  },
  // https://webpack.docschina.org/plugins/
  plugins: [
    new webpack.DefinePlugin({
      // vue会根据这个配置，根据不同的环境去区分打包
      'process.env': {
        // 比如开发环境，会输出一些提示，而生产不会等等
        NODE_ENV: isDev ? '"development"' : '"production"'
      }
    }),
    // make sure to include the plugin!
    new VueLoaderPlugin(),
    new HTMLPlugin()
  ]
}

// 根据不同环境去做判断不同的配置
if (isDev) {
  config.devtool = '#inline-source-map'
  config.devServer = {
    port: '8000',
    // 支持localhost / ip进行访问
    host: '0.0.0.0',
    overlay: {
      errors: true
    },
    hot: true,
  }
  config.plugins.push(
    // 启用模块热替换(Enable Hot Module Replacement - HMR)
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  )
}

module.exports = config
