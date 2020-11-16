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
    count: 0
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
      this.timer = setTimeout(() => {
        clearInterval(this.interval)
      }, 2000)
    },

    loop () {
      this.interval = setInterval(() => {
        this.timeHandler()
      }, 150)
    },

    timeHandler () {
      let count = Math.floor(Math.random() * (this.res.length))
      this.current = this.res[count].title
      while (this.res.length > 1 && count === this.count) {
        count = Math.floor(Math.random() * (this.res.length))
      }
      this.count = count
      this.current = this.res[count].title
      console.log(count)
    },

    clear () {
      if (this.timer) {
        clearTimeout(this.timer)
      }
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
