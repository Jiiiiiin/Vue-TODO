export default {
  // mutation的方法只能有两个参数，第一个就是state，第二个是一个单个值或者对象类型，不可以声明第三个值
  // 可以通过解构的方式来提高开发效率
  // updateCount (state, {var1, var2, ...}) {
  updateCount (state, newVal) {
    state.count = newVal
  }
}
