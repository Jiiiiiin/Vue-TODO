import Vue from 'vue'
// 参考：https://coding.imooc.com/lesson/196.html#mid=12214
// https://cn.vuejs.org/v2/guide/instance.html
/* eslint-disable no-new */
new Vue({
  el: '#root',
  // template: '<div>{{text}}</div>',
  data () {
    return {
      text: 'Vue'
    }
  },
  /**
   * 一次性，整个生命周期只会被调用一次；
   * 不能进行data属性的修改；
   */
  beforeCreate () {
    console.log('beforeCreate', this.$el)
  },
  /**
   * 一次性，整个生命周期只会被调用一次；
   * 最早可以进行属性修改的地方；
   */
  created () {
    /**
     * 一次性，整个生命周期只会被调用一次
     * 适合进行什么处理：
     *  1. 请求数据
     * */
    console.log('created', this.$el)
  },
  /**
   * 一次性，整个生命周期只会被调用一次；
   * 服务端渲染不会调用，因为服务端渲染根本没有dom环境；
   */
  beforeMount () {
    console.log('beforeMount', this.$el)
  },
  /**
   * 用于替换template模板解析的过程，在created之后vue就会进行判断是否需要进行templ的解析
   * @param {Function} h
   */
  render (h) {
    // 那么before mount得到的this.$el是默认的待填充节点
    // Vue在之后会将templ生成reader或者直接使用已有的render来创建真实渲染的节点
    // vue-loader 的一个重要作用就是帮助我们解析.vue文件中的template模块内容为一个reander方法，这样在打包之后的代码中，组件中的模板代码已经转换成了render方法，提高了执行效率
    console.log('render function invoked')
    return h('div', {}, this.text)
  },
  /**
   * 在本组件render方法执行出现错误，且是开发模式的时候会被调用，以便于调试
   * @param {*} h
   * @param {*} err
   */
  renderError (h, err) {
    return h('div', {}, err)
  },
  errorCaptured () {
    // 会向上冒泡，正式环境可以被调用，用于上传错误日志等
  },
  mounted () {
    /**
     * 一次性，整个生命周期只会被调用一次
     * 服务端渲染不会调用；
     *
     * 适合进行什么处理：
     *  1. 操作dom
     *  2. 请求数据（手动更新数据到dom）
     * */
    console.log('mounted', this.$el)
  },
  /**
   * data属性数据变化时候被执行
   */
  beforeUpdate () {
    console.log('beforeUpdate', this)
  },
  /**
   * data属性数据变化之后，重新调用render func渲染视图之后
   */
  updated () {
    console.log('updated', this)
  },
  activated () {
    console.log('activated', this)
  },
  deactivated () {
    console.log('deactivated', this)
  },
  /**
   * $destroy方法被调用之后执行
   */
  beforeDestroy () {
    console.log('beforeDestroy', this)
  },
  /**
   * 解除了watcher、event listener事件集合之后被执行
   */
  destroyed () {
    console.log('destroyed', this)
  }
})
