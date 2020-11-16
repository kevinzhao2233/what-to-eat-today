<template>
  <div class="page-home">
    <Card v-for="item in markBoxs" :key="item.id" :data="item" />
    <div class="btn">添加</div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Card from './components/Card'

export default {
  name: 'Home',
  components: { Card },
  computed: {
    ...mapState({
      markBoxs: state => state.mark.boxs
    })
  },
  created () {
    this.$store.dispatch('app/changeHeaderTitle', { title: '今天吃什么？' })
    this.$store.dispatch('app/changeHeaderTheme', { theme: 'hide' })
  }
}
</script>

<style lang="less" scoped>
.page-home {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 18vw 3vw 30vw;

  .btn {
    position: fixed;
    bottom: 6vw;
    left: 3vw;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 94vw;
    height: 16vw;
    font-size: 20px;
    color: @m-color-1;
    letter-spacing: 2px;
    background: @color-5;
    border-radius: 3vw;
    transition: transform 0.2s ease;

    &::after {
      position: absolute;
      bottom: 0;
      left: 10%;
      z-index: -1;
      display: block;
      width: 80%;
      height: 50%;
      content: '';
      border-radius: 6vw;
      box-shadow: 0 3vw 6vw -3vw @color-7;
    }

    &:active {
      transform: scale(0.9);
    }
  }
}
</style>
