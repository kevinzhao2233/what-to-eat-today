<template>
  <div class="page-surprise" @mousedown="start">
    <div class="main">{{current}}</div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Surprise',

  data: () => ({
    res: [],
    current: '点击屏幕开始抽签',
    timer: 0,
    interval: 0,
    randomCount: 0,
    counter: 12 // 计算随机的次数，12次后就得到结果
  }),

  computed: {
    ...mapState({
      markBoxs: state => state.mark.boxs
    })
  },

  created () {
    this.init()
  },

  methods: {
    init () {
      console.log(this.markBoxs)
      const data = this.markBoxs.find(item => item.id === this.$route.query.id)
      this.res = data.mark
      this.$store.dispatch('app/changeHeaderTitle', { title: data.title })
      this.$store.dispatch('app/changeHeaderTheme', { theme: 'colorful' })
    },

    start () {
      this.clear()
      this.loop()
    },

    loop () {
      this.interval = setInterval(() => {
        this.timeHandler()
      }, 120)
    },

    timeHandler () {
      let randomCount = Math.floor(Math.random() * (this.res.length))
      this.current = this.res[randomCount].title
      while (this.res.length > 1 && randomCount === this.randomCount && this.counter > 0) {
        randomCount = Math.floor(Math.random() * (this.res.length))
      }
      if (this.counter <= 0) {
        this.counter = 12
        this.current = this.res[randomCount].title
        this.clear()
      }
      this.counter--
      this.randomCount = randomCount
      this.current = this.res[randomCount].title
    },

    clear () {
      if (this.interval) {
        clearInterval(this.interval)
      }
    }
  },

  beforeDestroy () {
    this.clear()
  }
}
</script>

<style lang="less" scoped>
.page-surprise {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;

  .main {
    font-size: 30px;
    letter-spacing: 2px;
    user-select: none;
  }
}
</style>
