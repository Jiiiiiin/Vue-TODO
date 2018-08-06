import Todo from '../views/todo/todo.vue'
import Login from '../views/login/Login.vue'
import Menu from '../views/menu/Menu.vue'
// https://router.vuejs.org/zh/guide/#html
// 当前配置用来管理应用的路由配置项，组件和每一个路由节点的映射
export default [{
  path: '/',
  redirect: '/menu'
}, {
  path: '/menu',
  component: Menu
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
  component: Todo,
  meta: {
    title: 'this is todo app'
  }
  // 嵌套路由
  // children: [{
  //   path: 'test',
  //   component: Login
  // }]
}, {
  path: '/login/',
  component: Login
}]
