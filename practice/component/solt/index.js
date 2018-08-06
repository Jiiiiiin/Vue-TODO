import Vue from 'vue'

const Comp = {
  // template: `
  //   <div :style="style">
  //     <slot></slot>
  //   </div>
  // `,
  template: `
  <div :style="style">
    <div>
      <slot name="header">header</slot>
    </div>
    <slot a="a"></slot>
    <div>
      <slot name="footer">footer</slot>
    </div>
  </div>
`,
  data () {
    return {
      style: {
        width: '100%',
        height: '200px',
        padding: '10px',
        border: '1px solid #eee'
      }
    }
  }
}

/* eslint-disable no-new */
// slot-scope 可以访问组件内部 slot上面定义的属性的值
new Vue({
  el: '#root',
  components: {
    Comp
  },
  template: `
    <div>
      <Comp>
        <p slot="header">slot learn</p>
        <p slot-scope="arrts">{{arrts.a}} {{content}}</p>
        <p slot="footer">csii@cp</p>
      </Comp>
    </div>
  `,
  data () {
    return {
      content: 'slot content'
    }
  }
})
