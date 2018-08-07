<template lang="pug">
#app
  #cover
  Header
  // Todo
  // 包裹router-view的transition会作用于每一个路由的切换
  transition(
    name="fade"
  )
    router-view
  Footer

</template>

<script>
import Header from './layout/header.vue'
import Footer from './layout/footer.jsx'
// import Todo from './views/todo/todo.vue'

// console.log(Header.__docs)

export default {
  components: {
    Header,
    Footer
    // Todo
  },
  data () {
    return {
      text: 'Vue !'
    }
  },
  mounted () {
    console.log('app mounted')
    // 每一个组件内部都会被注入
    // 指向应用入口（index.js）中传入跟实例的store对象
    console.log('app mounted $store', this.$store)
  }
  // ！这个钩子不会像替换到router-view节点的组件里面定义那样执行
  // beforeRouteEnter (to, from, next) {
  //   console.log('组件内【App】路由守卫 beforeRouteEnter', to.path, from.path)
  // }
}
</script>

<style lang="stylus" scoped>
#app {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;

  #cover {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #999;
    opacity: 0.5;
    z-index: -1;
  }
}
</style>
