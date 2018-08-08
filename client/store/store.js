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
    actions,
    modules: {
      // 给每个模块取不同的名字，这个模块就具有了一个作用于
      a: {
        // 使用命名空间，让mutations、actions在当前空间（a）下面
        namespaced: true,
        modules: {
          c: {
            state: {
              text: 'ccc model text'
            }
          }
        },
        state: {
          text: '1'
        },
        getters: {
          // 第二个参数是当前对象
          // 第三个参数是根上面的state
          textPlus (state, getters, rootState) {
            // 访问全局或者不同模块的state属性
            return `${state.text}-${rootState.count}-${rootState.b.text}`
          }
        },
        // 默认vuex会将模块的mutation放在全局（即和外层的mutations做一个合并）
        // 但是这样就需要确保每一个mutations的方法名都不一样；
        // 如果需要每个模块都会不影响就需要声明namespaced: true,
        mutations: {
          // 这个state就是a模块的state
          updateText (state, text) {
            state.text = text
          }
        },
        actions: {
          // ctx相当于当前模块的`store`
          // add(ctx, data)
          updateTextAsync ({
            state,
            commit,
            rootState
          }) {
            setTimeout(() => {
              commit('updateText', rootState.firstName)
            }, 1000)
          },
          updateRootCountAsync ({
            state,
            commit,
            rootState
          }) {
            setTimeout(() => {
              // 如果要掉到外层的mutations，必须要加root: true
              commit('updateCount', rootState.firstName, {
                root: true
              })
            }, 1000)
          }
        }
      },
      b: {
        state: {
          text: '2'
        },
        actions: {
          callBrotherMutation ({
            commit
          }) {
            // commit('a/updateText', 'call b model action', {
            //   root: true
            // })
            // 因为b没有定义命名空间，可以不需要传递root: true
            commit('a/updateText', 'call b model action')
          }
        }
      }
    }
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
