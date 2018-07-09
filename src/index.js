import Vue from 'vue'
import App from './App.vue'
import './asset/styles/test.css'
import './asset/styles/test-stylus.styl'
import './asset/images/favicon.jpg'

const root = document.createElement('div')
document.body.appendChild(root)
console.log('process.env.NODE_ENV', process.env.NODE_ENV)
new Vue({
  render: (h) => h(App)
}).$mount(root)
