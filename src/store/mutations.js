import * as types from './mutation-type'

const mutations = {
  [types.SET_SINGER] (state, singer) {
    // 把singer数据存放在vuex的state中
    state.singer = singer
  }
}

export default mutations