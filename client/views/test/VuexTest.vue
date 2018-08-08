<template lang="pug">
  #test-vuex
    p count: {{counter}}
    p fullName: {{fullName}}
    p modules textA: {{textA}} {{aTextPlus}}
      button(
        @click="aUpdateText('A')"
        style="margin-left:10px"
      ) updateText
      button(
        @click="aUpdateTextAsync('A')"
        style="margin-left:10px"
      ) updateTextAsync
      button(
        @click="aUpdateRootCountAsync('A')"
        style="margin-left:10px"
      ) updateRootCountAsync

      p modules textC: {{cText}}
    p modules textB: {{textB}}
      button(
        @click="callBrotherMutation()"
        style="margin-left:10px"
      ) callBrotherMutation

</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  computed: {
    // ==== 测试模块
    textA () {
      // state后面需要跟上指定的模块名称
      return this.$store.state.a.text
    },
    textB () {
      return this.$store.state.b.text
    },
    // ==== 测试map语法
    // `...`语法需要设置babel的presets，如"stage-1"
    // ...mapState(['count']),
    // 需要定义非同名
    ...mapState({
      // counter: 'count'
      // 或者使用下面的写法，具有更好的灵活性
      counter: state => state.count + 1,
      cText: state => state.a.c.text
      // ！下面这种方式不生效
      // cText: 'a/c/text'
    }),
    // count () {
    //   return this.$store.state.count
    // },
    ...mapGetters({
      fullName: 'fullName',
      aTextPlus: 'a/textPlus'
    })
    // fullName () {
    //   return this.$store.getters.fullName
    // }
  },
  methods: {
    // 因为a模块设置了namespace所以就不能直接注入a模块的updateText，否则会报：[vuex] unknown mutation type: updateText
    // 调用方式：this['a/updateText']('text111')
    ...mapMutations({
      updateCount: 'updateCount',
      aUpdateText: 'a/updateText'
    }),
    // ...mapActions(['updateCountAsync'])
    ...mapActions({
      updateCountAsync: 'updateCountAsync',
      aUpdateTextAsync: 'a/updateTextAsync',
      aUpdateRootCountAsync: 'a/updateRootCountAsync',
      // 因为b模块并没有声明namespace，故可以直接注入
      callBrotherMutation: 'callBrotherMutation'
    })
    // aUpdateText (text) {
    //   this.$store.commit('a/updateText', text)
    // }
  },
  mounted () {
    // 调用命名模块的mutations
    // this['a/updateText']('text111')
    // 查看注入的$store
    // console.log(this.$store.state)
    // let idx = 1
    // // 通过commit调用mutation
    // setInterval(() => this.$store.commit('updateCount', idx++), 1000)
    // setInterval(() => this.updateCount(idx++), 1000)
    // !不能像下面这样使用(
    //  Error: [vuex] Do not mutate vuex store state outside mutation handlers.)
    // this.$store.state.count = 5
    // 调用（触发）action
    // this.$store.dispatch('updateCountAsync', {
    //   count: 10,
    //   timeout: 1000
    // })
    // this.updateCountAsyc({ count: 10, timeout: 1000 })
  }
}
</script>

<style lang="stylus" scoped>
#test-vuex {
  padding: 0px 10px;
}
</style>
