<template lang="pug">
  section(class="real-app")
    input(
      class="add-input"
      type="text"
      autofocus="autofocus"
      :placeholder="userid + '接下去要记录什么？'"
      @keyup.enter="addTodo"
    )
    Item(
      v-for="todo in filteredTodos"
      :key="todo.id"
      :todo="todo"
      @del="deleteTodo"
    )
    Tabs(
      :unFinishedTodoLength="unFinishedTodoLength"
      :filter="filter"
      @toggle="toggleFilter"
      @clearAllCompleted="clearAllCompleted"
    )
    // 做嵌套路由测试
    // router-view
</template>

<script>
import Item from './item.vue'
import Tabs from './tabs.vue'

let id = 0
export default {
  components: {
    Item,
    Tabs
  },
  props: {
    userid: {
      type: String,
      default: 'youke'
    }
  },
  data () {
    return {
      filter: 'all',
      todos: []
      // userid: ''
    }
  },
  computed: {
    unFinishedTodoLength () {
      return this.todos.filter(todo => !todo.completed).length
    },
    filteredTodos () {
      if (this.filter === 'all') {
        return this.todos
      }
      // item 是否已经完成
      const completed = this.filter === 'completed'
      return this.todos.filter(todo => completed === todo.completed)
    }
  },
  methods: {
    addTodo (e) {
      this.todos.unshift({
        id: id++,
        content: e.target.value.trim(),
        completed: false
      })
      e.target.value = ''
    },
    deleteTodo (id) {
      this.todos.splice(this.todos.findIndex(todo => todo.id === id), 1)
    },
    toggleFilter (state) {
      this.filter = state
    },
    clearAllCompleted () {
      this.todos = this.todos.filter(todo => todo.completed === false)
    }
  },
  mounted () {
    // console.log(this.$route)
    console.log('todo mounted', this.userid)
    // this.userid = this.$route.params.userid
  },
  beforeRouteEnter (to, from, next) {
    console.log(
      '组件内【todo】路由守卫 beforeRouteEnter',
      to.path,
      from.path,
      this
    )
    // next()
    next(vm => {
      // 在这里才能访问到当前组件的实例
      console.log('after enter this.userid is', vm.userid)
    })
  },
  // 自有当前组件被多个路由定义所使用（复用），但是params被更新之后才会被调用
  // 因为同一个组件，定义在不同的路由定义【routes.js】中，其实会被复用
  // 这个钩子的作用就是同一个组件，但是参数不同，需要渲染的*业务数据*也不同，那么发送请求的时机就必须在这个时候
  // 还有另外一种做法就是检测params props，添加一个watch，但是这种就加大了开销，需要实时监控
  // 在这个节点进行数据加载如果出错，还可以通过next函数返回上一个页面，然后提示用户，那么url就不会变
  beforeRouteUpdate (to, from, next) {
    console.log(
      '组件内【todo】路由守卫 beforeRouteUpdate',
      to.path,
      from.path,
      this
    )
    next()
    // 获取服务器端数据
    // 设置数据：
    // Vue.$ajax().then((res) => {
    //    next(vm => {
    //       vm.xxx = res.xxx
    //     }
    // })
  }
}
</script>

<style lang="stylus" scoped>
.real-app {
  width: 600px;
  margin: 0px auto;
  box-shadow: 0px 0px 5px #666;

  .add-input {
    positon: relative;
    margin: 0px;
    width: 100%;
    font-size: 24px;
    font-family: inherit;
    font-weight: inherit;
    line-height: 1.4rem;
    border: 0;
    outline: none;
    color: inherit;
    padding: 6px;
    border: 1px solid #999;
    box-shadow: inset 0 -1px 5px 0px rgba(0, 0, 0, 0);
    box-sizing: border-box;
    font-smoothing: antialiased;
    padding: 16px 16px 16px 60px;
    border: none;
  }
}
</style>
