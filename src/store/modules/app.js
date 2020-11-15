const state = {
  header: {
    title: '今天吃什么',
    options: [
      { name: '操作1', handler: 'HANDLER_1' }
    ]
  }
}
const mutations = {
  CHANGE_HEADER_TITLE: (state, { title }) => {
    // console.log('mutation -- CHANGE_HEADER_TITLE -->>', title)
    state.header.title = title
  },
  CHANGE_HEADER_OPT: (state, opt) => {
    console.log('mutation -- CHANGE_HEADER_TITLE -->>', opt)
    state.header.options = [...opt]
  }
}

const actions = {
  changeHeaderTitle: ({ commit }, data) => {
    commit('CHANGE_HEADER_TITLE', data)
  },
  changeHeaderOpt: ({ commit }, data) => {
    commit('CHANGE_HEADER_OPT', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
