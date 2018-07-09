import Vue from 'vue'
import App from './App.vue'
import './asset/styles/test.css'
import './asset/styles/test-stylus.styl'
import './asset/images/favicon.jpg'

const root = document.createElement('div')
document.body.appendChild(root)

new Vue({
  render: (h) => h(App)
}).$mount(root)
