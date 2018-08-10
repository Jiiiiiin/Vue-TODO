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
    // plugins: [
    //   // 在plugin初始化的时候回把当前的store传递过来
    //   (store) => {
    //     // 这个方法只会执行一次，但是在这里可以去订阅或者声明自定义模块
    //     console.log('my plugin invoked')
    //   }
    // ],
    // 测试模块
    modules: {
      // 给每个模块取不同的名字，这个模块就具有了一个作用于
      a: {
        // 使用命名空间，让mutations、actions在当前空间（a）下面
        namespaced: true,
        modules: {
          c: {
            state: {
              text: 'ccc model text...!!!'
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

  // 加入针对vuex的热更新功能，依赖webpack支持
  if (module.hot) {
    console.log('处理vuex热更新')
    module.hot.accept([
      // 针对需要进行热更新的东西
      './state/state',
      './getters/getters',
      './mutations/mutations',
      './actions/actions'
    ], () => {
      // 开启热更新功能
      // 不能用import，因为import只能写在最外层，不能再业务代码逻辑里面书写
      const newState = require('./state/state').default
      const newGetters = require('./getters/getters').default
      const newMutations = require('./mutations/mutations').default
      const newActions = require('./actions/actions').default

      store.hotUpdate({
        state: newState,
        getters: newGetters,
        mutations: newMutations,
        actions: newActions
      })
    })
  }

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
