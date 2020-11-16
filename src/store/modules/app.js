const state = {
  header: {
    title: '今天吃什么',
    theme: 'colorful' // white、colorful、hide
  },
  editMarkStatus: 0 // 0 啥也没有；1 让小签出现删除按钮；2 暂时放着，可能是删掉整个签盒
}
const mutations = {
  CHANGE_HEADER_TITLE: (state, { title }) => {
    // console.log('mutation -- CHANGE_HEADER_TITLE -->>', title)
    state.header.title = title
  },
  CHANGE_HEADER_THEME: (state, { theme }) => {
    state.header.theme = theme
  },
  CHANGE_EDIT_MARK_STATUS: (state, { status }) => {
    state.editMarkStatus = status
  }
}

const actions = {
  changeHeaderTitle: ({ commit }, data) => {
    commit('CHANGE_HEADER_TITLE', data)
  },
  changeHeaderTheme: ({ commit }, data) => {
    commit('CHANGE_HEADER_THEME', data)
  },
  changeEditMarkStatus: ({ commit }, data) => {
    commit('CHANGE_EDIT_MARK_STATUS', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
