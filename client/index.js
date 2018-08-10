import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import App from './App.vue'
import './assets/styles/global.styl'
import createRouter from './config/router'
import createStore from './store/store'

Vue.use(VueRouter)
Vue.use(Vuex)

const router = createRouter()
const store = createStore()
// 测试动态模块
store.registerModule('dynamicModel', {
  state: {
    text: 3
  }
})

// 路由全局守卫钩子，在每次路由跳转的时候，以下钩子都会被触发，优先于组件的生命周期钩子被调用
// 准备进行路由跳转的时候调用
router.beforeEach((to, from, next) => {
  console.log('路由守卫 beforeEach', to.path, from.path)
  next()
  // 可以在这里做一些前端路由权限的控制，比如，判断用户只有登录之后才能进入app，如
  // if (isSign) {
  //   next()
  // } else {
  //   next({path: '/login', replace})
  // }
})

// 在 2.5.0+ 你可以用 router.beforeResolve 注册一个全局守卫。这和 router.beforeEach 类似，区别是在导航被确认之前，同时在所有组件内守卫和异步路由组件被解析之后，解析守卫就被调用。
// 需要等全局》路由定义》组件 3者的beforEach都执行完毕之后才会被执行
// 意思就是，前面的路由匹配和自定义的“校验”都通过（被调用了next()），之后，确认无误要跳转之前才会触发
router.beforeResolve((to, from, next) => {
  console.log('路由守卫 beforeResolve', to.path, from.path)
  next()
})

// 跳转完成被调用，优先于组件的生命周期钩子被调用
router.afterEach((to, from) => {
  console.log('路由守卫 afterEach', to.path, from.path)
})

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#root')
