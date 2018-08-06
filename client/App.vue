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
import Todo from './views/todo/todo.vue'

// console.log(Header.__docs)

export default {
  components: {
    Header,
    Footer,
    Todo
  },
  data () {
    return {
      text: 'Vue !'
    }
  }
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
