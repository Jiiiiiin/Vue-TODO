// 必须要使用require.resolve的方式使用，详细查看webpack require.resolve
// const docsLoader = require.resolve('./doc-loader')

module.exports = (isDev) => {
  return {
    // 删除template中的空格（避免空格导致的css问题）
    preserveWhitepace: true,
    // 将页面组件的css放到ExtractTextPlugin提取出来的css文件中，这种对于大型项目开启异步组件页面的可能存在一定的影响
    // !只有在正式环境才可以设置是否进行组件内样式的提取与否
    extractCSS: !isDev,
    cssModules: {

    },
    // 直接使用外面的单独制定的postcss的配置
    // postcss: {}
    // 根据npm script中定义的process.env.NODE_ENV来判断是否需要进行vue组件的热重载（非css热重载，因为样式的热重载是根据vue-style-loader来实现的）
    // 默认情况不需要配置，插件会根据环境变量自动配置
    // hotReload: isDev
    // 给vue-loader自定义模块指定自定义的loader
    // 如还可以给js其他3个模块指定loader
    // 在上面loader之前解析
    // preLoader:{}
    // loaders: {
    //   'docs': docsLoader
    // }
    // 后解析流程
    // postLoader: {}
  }
}
