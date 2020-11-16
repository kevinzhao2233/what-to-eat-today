
function setLocalStorage ({ key, value }) {
  window.localStorage.setItem(key, JSON.stringify(value))
}

function hasLocalStorage (key) {
  const res = window.localStorage.getItem(key)
  if (!res) return false
  if (JSON.parse(res).length < 2) return false
  return true
}

const defBoxs = [
  {
    id: '10086',
    title: '今天吃什么？',
    mark: [
      { title: '羊杂' },
      { title: '土豆丝盖饭' },
      { title: '土豆烧牛腩' },
      { title: '炒面片' }
    ],
    hideMark: [
      { title: '猪头肉' },
      { title: '牛肉面' }
    ]
  },
  {
    id: '10087',
    title: '这次谁刷马桶？',
    mark: [
      { title: '赵凯文' },
      { title: 'Mine Owner' },
      { title: '路帅' },
      { title: '赵光涛' },
      { title: '李智豪' }
    ]
  },
  {
    id: '10088',
    title: '去哪家吃饭啊？',
    mark: [
      { title: '香盛源' },
      { title: '牛卖肉' },
      { title: '农家菜馆' },
      { title: '尔力' },
      { title: '牛肉面管' }
    ]
  }
]

const state = {
  boxs: hasLocalStorage('MARK_BOXS') ? JSON.parse(localStorage.getItem('MARK_BOXS')) : defBoxs
}

const mutations = {
  // 不用箭头函数，为了绑定 this，commit 的 type 需要全路径
  UPDATE (state, data) {
    const index = state.boxs.findIndex(item => item.id === data.id)
    if (index > -1) {
      state.boxs.splice(index, 1, data)
      this.commit('mark/SAVE_BOXS')
    }
  },
  REMOVE_MARK_BOX (state, { id }) {
    const index = state.boxs.findIndex(item => item.id === id)
    if (index > -1) {
      state.boxs.splice(index, 1)
      this.commit('mark/SAVE_BOXS')
    }
  },
  SAVE_BOXS (state) {
    setLocalStorage({ key: 'MARK_BOXS', value: state.boxs })
  }
}

const actions = {
  update: ({ commit }, data) => {
    commit('UPDATE', Object.assign({}, data))
  },
  removeMarkBox: ({ commit }, data) => {
    commit('REMOVE_MARK_BOX', data)
  }
  // saveBox: ({ state }) => {
  //   setLocalStorage({ key: 'MARK_BOXS', value: state.boxs })
  // }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
