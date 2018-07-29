import Vue from 'vue'

/* eslint-disable no-new */
new Vue({
  el: '#root',
  template: `
    <div>
      <div>{{text}}</div>
      <p>fName: {{fName}}</p>
      <p>fullName: {{fullName}}</p>
      firstName: <input type="text" v-model="firstName" placeholder="firstName" :style="inputStyle"/>
    </div>
  `,
  data () {
    return {
      text: 'Computed Lean',
      inputStyle: {
        border: '1px solid #eee',
        padding: '10px'
      },
      fullName: '',
      firstName: 'Li',
      lastName: 'Si'
    }
  },
  computed: {
    // 其中的方法将会注入实例，可以作为实例的一个【属性】
    // 其实就是为实例创建了一系列getter方法，存在缓存控制，如果计算的值没有变更则不会重新计算
    // 用于需要在模板中显示，又需要进行动态拼接的计算
    // 对于需要计算的属性，这种方式优于直接使用方法
    // ！一般不要使用computed的对象声明写法，更不要使用set方式进行关联属性的解构，这样容易导致应用逻辑混乱
    // ！computed和watch中建议不要去修改监控的data中的属性值，以免出现无限循环
    fName () {
      return this.firstName + ' ' + this.lastName
    }
  },
  watch: {
    // watch适用于监听某个属性，在属性改变的时候，进行一些业务处理，如提交后台相关数据变更等
    // ！最好不要使用watch的值去作为显示，因为watch的属性默认是不会被计算，除非监听的值进行了变化
    // 或者使用下面极端的做法:
    firstName: {
      handler (newVal, oldVal) {
        console.log('firstName changged')
        this.fullName = newVal + ' ' + this.lastName
      }
      // 声明我们需要立即执行handler，相较于computed，要实现相同的作用就需要多些很多代码
      // 且性能层面compluted更好
      // immediate: true
      // ！深入观察检测的属性，比如检测data中的一个对象中的属性，但是这种做法会导致性能下降
      // ！不建议使用，建议直接watch对应对象的属性
      // deep: true
    }
  }
})
