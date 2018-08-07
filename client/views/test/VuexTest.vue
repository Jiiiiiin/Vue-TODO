<template lang="pug">
  #test-vuex
    p count: {{counter}}
    p fullName: {{fullName}}
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  computed: {
    // `...`语法需要设置babel的presets，如"stage-1"
    // ...mapState(['count']),
    // 需要定义非同名
    ...mapState({
      // counter: 'count'
      // 或者使用下面的写法，具有更好的灵活性
      counter: state => state.count + 1
    }),
    // count () {
    //   return this.$store.state.count
    // },
    ...mapGetters(['fullName'])
    // fullName () {
    //   return this.$store.getters.fullName
    // }
  },
  mounted () {
    // 查看注入的$store
    // console.log(this.$store.state)
    // let idx = 1
    // // 通过commit调用mutation
    // setInterval(() => this.$store.commit('updateCount', idx++), 1000)
  }
}
</script>
