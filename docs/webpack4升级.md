# 项目升级到 webpack4

> [webpack4 升级](https://coding.imooc.com/lesson/196.html#mid=12389)

```bash
 jiiiiiin@jiiiiiins-MacBook-Pro  ~/Documents/WebstormProjects/todos   feature/webpack4-first ●  npm i webpack webpack-dev-server webpack-merge webpack-cli -D

> fsevents@1.2.4 install /Users/jiiiiiin/Documents/WebstormProjects/todos/node_modules/fsevents
> node install

[fsevents] Success: "/Users/jiiiiiin/Documents/WebstormProjects/todos/node_modules/fsevents/lib/binding/Release/node-v57-darwin-x64/fse.node" already installed
Pass --update-binary to reinstall or --build-from-source to recompile
npm WARN eslint-loader@2.0.0 requires a peer of eslint@>=1.6.0 <5.0.0 but none is installed. You must install peer dependencies yourself.
npm WARN extract-text-webpack-plugin@3.0.2 requires a peer of webpack@^3.1.0 but none is installed. You must install peer dependencies yourself.
npm WARN ajv-keywords@3.2.0 requires a peer of ajv@^6.0.0 but none is installed. You must install peer dependencies yourself.
npm WARN todos@1.0.0 No repository field.

+ webpack@4.16.0
+ webpack-dev-server@3.1.4
+ webpack-cli@3.0.8
added 522 packages in 58.711s

jiiiiiin@jiiiiiins-MacBook-Pro  ~/Documents/WebstormProjects/todos   feature/webpack4-first ●  npm i extract-text-webpack-plugin@next ajv@^6.0.0 -D
```

- 在 webpack4 之后 webpack 命令行指令都是放在 webpack-cli 中，默认的 webpack 只能作为 node 的包使用而不能再命令行使用；
- 目前从 extract-text-webpack-plugin issues 了解， 未来 extract-text-webpack-plugin 将废弃，作者建议使用 mini-css-extract-plugin 插件

* 修改配置：

```bash
const config = {
  // https://webpack.docschina.org/configuration/
  mode: process.env.NODE_ENV,

  // CommonsChunkPlugin在webpack4被废弃
  // new webpack.optimize.CommonsChunkPlugin({
  //   // name 必须要和entry中的对应那么值相等
  //   name: 'vendor'
  // }),
  // // 注意，引入顺序在这里很重要。CommonsChunkPlugin 的 'vendor' 实例，必须在 'manifest' 实例之前引入。
  // // https://webpack.docschina.org/guides/caching
  // // 避免因为加入新的业务模块导致chunkid变化，导致打包的内容发生变化，故把wenpack相关的代码文件打包在另外的文件
  // new webpack.optimize.CommonsChunkPlugin({
  //   name: 'manifest'
  // }),
  entry: {
      app: path.join(__dirname, '../client/index.js'),
      // 单独打包
      // webpack4 在配置了splitChunks之后就不需要了，默认被放到splitChunks的chunks中
      // vendor: ['vue']
    },
  optimization: {
   splitChunks: {
     chunks: 'all',
     name: 'common',
   },
   runtimeChunk: {
     name: 'runtime',
   }
 }

  // webpack4被弃用
  // https://webpack.docschina.org/concepts/mode
  // new webpack.DefinePlugin({
  //   // vue会根据这个配置，根据不同的环境去区分打包
  //   'process.env': {
  //     // 比如开发环境，会输出一些提示，而生产不会等等
  //     NODE_ENV: isDev ? '"development"' : '"production"'
  //   }
  // }),

      // webpack4 自动根据mode配置
      // https://webpack.docschina.org/concepts/mode
      // new webpack.NoEmitOnErrorsPlugin()
    ])

    # 下面这个依赖可以警告忽略
    # "ajv": "^6.5.2",
```

- vue-loader 升级

```bash
ERROR in ./client/App.vue
Module build failed (from ./node_modules/vue-loader/index.js):
TypeError: Cannot read property 'vue' of undefined
    at Object.module.exports (/Users/jiiiiiin/Documents/WebstormProjects/todos/node_modules/vue-loader/lib/loader.js:61:18)
 @ ./client/index.js 7:11-31
 @ multi (webpack)-dev-server/client?http://0.0.0.0:8000 webpack/hot/dev-server ./client/index.js
Child html-webpack-plugin for "index.html":

jiiiiiin@jiiiiiins-MacBook-Pro  ~/Documents/WebstormProjects/todos   feature/webpack4-first ●  npm i vue-loader -D
+ vue-loader@15.2.4
```

> [vue-loader 文档](https://vue-loader.vuejs.org/zh/guide/extract-css.html#webpack-4)

- 打包对比

升级之前:
![升级之前](https://ws2.sinaimg.cn/large/006tNc79gy1ftbiwkpxdgj317m0fcdi7.jpg)

升级之后:
![升级之后](https://ws1.sinaimg.cn/large/006tNc79gy1ftbip84ioqj31bq0rw0ua.jpg)

- [修改详细日志](https://github.com/Jiiiiiin/Vue-TODO/commit/0131e7b53d1d36eaa6884a128bc70e577acad7e5)
