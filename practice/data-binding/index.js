import Vue from 'vue'

/* eslint-disable no-new */
new Vue({
  el: '#root',
  template: `
    <div :class="{active: isActive}">{{text}}</div>
  `,
  data () {
    return {
      text: 'Vue',
      isActive: true
    }
  }
})
