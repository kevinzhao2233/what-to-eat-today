const state = {
  boxs: [
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
      title: '这次谁刷马桶？',
      mark: [
        { title: '赵凯文' },
        { title: 'Mine Owner' },
        { title: '路帅' },
        { title: '赵光涛' },
        { title: '李智豪' }
      ]
    }
  ]
}
const mutations = {
}
const actions = {
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
