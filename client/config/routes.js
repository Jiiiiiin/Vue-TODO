// import Todo from '../views/todo/todo.vue'
// https://router.vuejs.org/zh/guide/#html
// 当前配置用来管理应用的路由配置项，组件和每一个路由节点的映射
export default [{
  path: '/',
  redirect: '/menu'
}, {
  path: '/VuexTest',
  component: () =>
    import('../views/test/VuexTest.vue')
}, {
  path: '/menu',
  component: () =>
    import('../views/menu/Menu.vue')
}, {
  path: '/app/:userid',
  // 【props: true】让userid参数直接作为组件的一个属性进行赋值
  // 这种好处是和router解耦，可以在todo组件中不必显示的去从$route中获取参数
  props: true,
  // 这里的route就是实例上面的$route，返回的属性就是props赋值给组件对应的属性
  // props: (route) => {id: route.params.userid}
  // props: {
  // 指定特定的其他非参数属性
  // name: '小马'
  // },
  name: 'app',
  // component: Todo,
  // 需要配合 npm i babel-plugin-syntax-dynamic-import -d 插件使用，才能使用动态import这个feat
  component: () =>
    import('../views/todo/todo.vue'),
  // 针对一个页面有多个router-view节点需要显示不同的内容（组件）的配置方式
  // components: {
  //   default: Todo,
  //   [router-view-name]: [Comp]
  // },
  meta: {
    title: 'this is todo app'
  },
  beforeEnter: (to, from, next) => {
    console.log('单个路由【app】定义路由守卫 beforeEnter', to.path, from.path)
    next()
  }
  // 嵌套路由
  // children: [{
  //   path: 'test',
  //   component: Login
  // }]
}, {
  path: '/login/',
  component: () =>
    import('../views/login/Login.vue')
}]
