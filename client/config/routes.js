import Todo from '../views/todo/todo.vue'
import Login from '../views/login/Login.vue'
// https://router.vuejs.org/zh/guide/#html
// 当前配置用来管理应用的路由配置项，组件和每一个路由节点的映射
export default [{
  path: '/',
  component: Todo
}, {
  path: '/login',
  component: Login
}]
