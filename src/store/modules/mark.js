
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
      { title: '炒面片' },
      { title: '天津冷冻虾私房菜' }
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
      { title: '李白' },
      { title: '蜘蛛侠' },
      { title: '秦始皇' },
      { title: '白骨精' },
      { title: '王二蛋' },
      { title: '灭霸' }
    ]
  },
  {
    id: '10088',
    title: '去哪家吃饭啊？',
    mark: [
      { title: '海底捞' },
      { title: '林正英炒饭' },
      { title: '大盘鸡' },
      { title: '肯德基' }
    ]
  }
]

const state = {
  boxs: hasLocalStorage('MARK_BOXS') ? JSON.parse(localStorage.getItem('MARK_BOXS')) : defBoxs
}

const mutations = {
  ADD_MARK_BOX (state, data) {
    const newBox = {
      id: data.id,
      title: '新的签盒',
      mark: [{ title: '小签' }],
      hideMark: []
    }
    state.boxs.unshift(newBox)
  },
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
  addMarkBox: ({ commit }, data) => {
    commit('ADD_MARK_BOX', data)
  },
  update: ({ commit }, data) => {
    commit('UPDATE', Object.assign({}, data))
  },
  removeMarkBox: ({ commit }, data) => {
    commit('REMOVE_MARK_BOX', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
