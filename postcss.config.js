const autoprefixer = require('autoprefixer')

// 后处理css，即在stylus编译成css之后，由postcss进行进一步的处理
module.exports = {
  plugins: [
    // 加浏览器前缀支持
    autoprefixer()
  ]
}
