<template>
  <div class="page-edit">
    <div class="banner">{{res.title}}</div>
    <div class="top">
      <Mark v-for="item in res.mark" :key="item.title" :data="item" />
    </div>
    <div class="bottom">
      <Mark v-for="item in res.hideMark" :key="item.title" :data="item" />
    </div>
    <div class="btn">添加</div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Mark from './components/Mark'

export default {
  name: 'Edit',
  components: { Mark },
  data: () => ({
    res: []
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
      this.$store.dispatch('app/changeHeaderTitle', { title: '' })
      if (this.$route.query.type === 'edit') {
        this.edit()
      }
      if (this.$route.query.type === 'create') {
        this.create()
      }
    },
    edit () {
      this.res = this.markBoxs.find(item => item.id === this.$route.query.id)
    },
    create () {
      //
    },
    addMark (title) {
      this.$store.dispatch('mark/add', { title })
    },
    toggleMark (mark) {
      this.$store.dispatch('mark/toggle', mark)
    }
  }
}
</script>
<style lang="less" scoped>
.page-edit {
  position: relative;

  .banner {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 64vw;
    font-size: 24px;
    color: @m-color-1;
    letter-spacing: 2px;
    background: @color-3;
  }

  .top {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 6vw 6vw 1vw;
    border-bottom: 1px solid @m-color-3;
  }

  .bottom {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 6vw;
  }

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
    transition: all 0.2s ease;

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
