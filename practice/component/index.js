import Vue from 'vue'

// 基础的v-model组件
// const Comp = {
//   template: `
//     <div>
//       <input type="text" @input="handleInput" :value="value"
//         style="border: 1px solid; padding: 10px"/>
//     </div>
//   `,
//   props: ['value'],
//   methods: {
//     handleInput (e) {
//       this.$emit('input', e.target.value)
//     }
//   }
// }

// 如果需要让v-model不和value属性冲突，需要像下面这样定义
const Comp = {
  template: `
    <div>
      <lable>{{value}}</lable>
      <input type="text" @input="handleInput" :value="value1"
        style="border: 1px solid; padding: 10px"/>
    </div>
  `,
  model: {
    // 给props待声明的属性指定属性名称和事件名称
    prop: 'value1',
    event: 'change'
  },
  props: ['value', 'value1'],
  methods: {
    handleInput (e) {
      this.$emit('change', e.target.value)
    }
  }
}

/* eslint-disable no-new */
// 给自定义组件实现双向绑定的demo
// v-model 指令其实就是给我们像 <comp :value="rvalue" @input="rvalue = arguments[0]"></comp>
// 在组件上面增加了一个props和一个input事件的监听
// 我的理解应该是帮我们向组件的props value属性进行了绑定 和对input事件绑定的函数做了默认处理
new Vue({
  el: '#root',
  components: {
    Comp
  },
  template: `
    <div>
    <div>
      <comp value="lable1" :value1="rvalue" @change="rvalue = arguments[0]"></comp>
    </div>
    <br/>
    <div>
      <comp value="label2" v-model="rvalue2"></comp>
    </div>
    </div>
  `,
  data () {
    return {
      rvalue: 'rvalue',
      rvalue2: 'rvalue2'
    }
  }
})
