// https://router.vuejs.org/zh/guide/#html
// 当前配置用来注册router到vue（项目）

import Router from 'vue-router'
import routes from './routes'

export default () => {
  // 这种每一次在外部import当前文件的时候都会创建一个新的实例
  // 便于在服务端渲染的内存溢出问题
  return new Router({
    mode: 'history',
    // 没加base之前
    // http://localhost:8000/app
    // 加base之后
    // http://localhost:8000/pmobile/app
    // 设置之后使用vue-router api进行跳转的时候，router都会在path之前加上这个base path
    // 不是很成熟
    // base: '/pmobile/',
    routes
  })
}
