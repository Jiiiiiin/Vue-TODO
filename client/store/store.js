import Vuex from 'vuex'
// 默认数据，所以命名为default
import defaultState from './state/state'
// 操作方法，无默认可言
import mutations from './mutations/mutations'
import getters from './getters/getters'
import actions from './actions/actions'

const isDev = process.env.NODE_ENV === 'development'

// 下面这种方式是为了做服务端渲染，必须每一次import都生成新的store
export default () => {
  const store = new Vuex.Store({
    // 不能再生产环境设置为true！！
    strict: isDev,
    state: defaultState,
    getters,
    mutations,
    actions
  })
  return store
}

// 非服务端渲染

// import Vue from 'vue'
// Vue.use(Vuex)

// const store = new Vuex.Store({
//   state: {
//     count: 0
//   },
//   mutations: {
//     updateCount (state, newVal) {
//       state.count = newVal
//     }
//   }
// })

// export default store
