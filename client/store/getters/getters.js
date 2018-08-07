// 可以将vuex的getters理解为vue实例中的computed计算属性
export default {
  fullName (state) {
    return `${state.lastName} ${state.firstName}`
  }
}
