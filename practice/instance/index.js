import Vue from 'vue'
// /* eslint-disable no-new */
// new Vue({
//   // 挂载到模板文件的#root，这个过程其实是一个替换的过程
//   el: '#root',
//   template: '<div>instance</div>'
// })

// 挂载到模板的另外一种方式，和上面的方式一模一样
const app = new Vue({
  // 挂载到模板文件的#root，这个过程其实是一个替换的过程
  template: '<div>{{obj.a}}</div>',
  data () {
    return {
      obj: {}
    }
  }
})
app.$mount('#root')

// Vue实例上面的常用属性：
// app.$options: 返回的是创建Vue示例时候的options参数对象，其中的data和$data非同一个对象
// app.$data: 返回的是真正的组件（实例）的响应data对象，修改其属性可以直接影响到页面
// app.$root: 返回应用树的挂载根节点实例对象（spa中应该是唯一的），每一个组件的$root得到的都是相同的一个实例对象
// app.$el: 返回的是根实例或者说SPA应用的挂载点DOM对象，而且该对象是被替换之后的真正映射在页面上面的根节点
// console.log(app.$el)
// app.$refs: 返回dom节点对象 / vue组件示例对象

// Vue实例上面的常用方法：
// app.$watch: 通options中声明的watch配置，这里是单独watch单个属性（data属性或者其他），实例方法需要手动调用返回的方法（进行watch的销毁），而在options watch属性中声明的vue会帮我们自动销毁
// app $on/$once/$emit在同一个实例声明和触发事件，只能在同一个实例才会触发成功，不会具有冒泡等特性，$once只会被触发一次
// app.$forceUpdate() 强行执行页面的渲染
// app.obj.a = 1
// 因为vue本身要求data中的属性必须要*事先声明*，使用forceUpdate就可以触发vue进行强行渲染
// ！除非万不得已才需要使用
// app.$forceUpdate()
// 下面这种方式是vue动态给data中的obj属性*补上了*（动态追加）了响应式属性
// app.$set(app.obj, 'a', 1)
// 可以使用$delete删除响应式属性，避免内存溢出
// app.$nextTick vue在下一次进行页面渲染的时候调用该方法传递的回调函数，作用于需要在dom渲染之后，操作该dom示例的时机
