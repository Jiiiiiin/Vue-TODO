module.exports = (isDev) => {
  return {
    // 删除template中的空格（避免空格导致的css问题）
    preserveWhitepace: true,
    // 将页面组件的css放到ExtractTextPlugin提取出来的css文件中，这种对于大型项目开启异步组件页面的可能存在一定的影响
    extractCSS: true
  }
}
