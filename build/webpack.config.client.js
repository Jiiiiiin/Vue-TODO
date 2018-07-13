const path = require('path')
// https://webpack.docschina.org/plugins/html-webpack-plugin/
const HTMLWebpackPlugin = require('html-webpack-plugin')
// 期望把css分离出打包之后的bundle文件
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')
// 会根据
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
// 通过package script中设置环境变量
const isDev = process.env.NODE_ENV === 'development'
// 只用于client端渲染
const defaultPlugins = [
  new webpack.DefinePlugin({
    // vue会根据这个配置，根据不同的环境去区分打包
    'process.env': {
      // 比如开发环境，会输出一些提示，而生产不会等等
      NODE_ENV: isDev ? '"development"' : '"production"'
    }
  }),
  new HTMLWebpackPlugin()
]

const devServer = {
  port: '8000',
  // 支持localhost / ip进行访问
  host: '0.0.0.0',
  overlay: {
    errors: true
  },
  hot: true,
}

let config

// 根据不同环境去做判断不同的配置
if (isDev) {
  config = merge(baseConfig, {
    devtool: '#inline-source-map',
    devServer,
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
          //     module: true,
          //     localIdentName: isDev ? '[path][name]-[hash:base64:5]' : '[hash:base64:5]',
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
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    ])
  })
} else {
  config = merge(baseConfig, {
    // 将lib和业务代码提取
    // https://webpack.docschina.org/guides/caching
    entry: {
      app: path.join(__dirname, '../client/index.js'),
      // 单独打包
      vendor: ['vue']
    },
    output: {
      // 生产需要使用chunkhash（单个chunk，入口、异步组件...）实现有效缓存（在文件内容不变的情况下，文件名字不一定会变）
      // 开发使用hash，因为dev-server需要，hash就是用来标识单次打包的标识符
      filename: '[name].[chunkhash].bundle.js'
    },
    module: {
      rules: [{
        test: /\.styl(us)?$/,
        // 提取css
        use: ExtractTextPlugin.extract({
          // 将生成的css文件，写入html
          // fallback: 'style-loader',
          // vue-loader提出需要把上面的style-loader切换成vue-style-loader，以实现开发过程中的样式热重载功能
          fallback: 'vue-style-loader',
          // 处理生成css
          use: [
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            },
            'stylus-loader'
          ]
        })
      }]
    },
    plugins: defaultPlugins.concat([
      new CleanWebpackPlugin(['dist'], {
        root: path.join(__dirname, '../'),
        verbose: true
      }),
      new webpack.optimize.CommonsChunkPlugin({
        // name 必须要和entry中的对应那么值相等
        name: 'vendor'
      }),
      // 注意，引入顺序在这里很重要。CommonsChunkPlugin 的 'vendor' 实例，必须在 'manifest' 实例之前引入。
      // https://webpack.docschina.org/guides/caching
      // 避免因为加入新的业务模块导致chunkid变化，导致打包的内容发生变化，故把wenpack相关的代码文件打包在另外的文件
      new webpack.optimize.CommonsChunkPlugin({
        name: 'manifest'
      }),

      // 指定输出的css的名称
      // 使用css文件内容的hash
      // https://webpack.docschina.org/guides/caching
      new ExtractTextPlugin('styles.[contentHash:8].css')
    ])
  })
}

module.exports = config
