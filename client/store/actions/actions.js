export default {
  // 可以通过解构的方式来提高开发效率
  // updateCount (state, {var1, var2, ...}) {
  // updateCountAsync (store, {
  updateCountAsync ({
    commit
  }, {
    count,
    timeout
  }) {
    setTimeout(() => commit('updateCount', count), timeout)
  }
}
