import Vue from 'vue'

/* eslint-disable no-new */
new Vue({
  el: '#root',
  data () {
    return {
      text: 'Vue'
    }
  },
  render (h) {
    return h('div', {}, this.text)
  }
})
