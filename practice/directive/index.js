import Vue from 'vue'

// 参考：https://coding.imooc.com/lesson/196.html#mid=12217
// 数据绑定类：
// v-bind:[attr]="[data:mvar]" 标识数据绑定指令绑定的属性是[attr]，数据就是对于的data中的值
// vue给一些指令做了简写，比如 `:id="text"`
// v-text 绑定标签中显示的值
// v-html 可以显示html标签内容，将变量内容作为html标签插入
// ...
// 事件绑定类：
// 其他：
// v-once
// v-cloak
// v-on:[eventName]="[methods:funcName]"
/* eslint-disable no-new */
new Vue({
  el: '#root',
  template: `
    <div :id="text">
      <div v-bind:class="text">{{text}}</div>
    </div>
  `,
  data () {
    return {
      text: 'learn directive'
    }
  }
})
