<template>
  <div class="layout-header">
    <span class="title">
      <i class="icon ri-home-3-line" :class="header.theme" @mousedown="goHome"></i>
      {{ header.title }}
    </span>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Header',
  data: () => ({
    isShowOpt: false
  }),
  computed: {
    ...mapState({
      header: state => state.app.header
    })
  },

  methods: {
    goHome () {
      this.$router.replace({
        name: 'Home'
      })
    }
  }
}
</script>

<style lang="less" scoped>
.layout-header {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 60px;
  padding: 0 12px;

  .title {
    padding: 1vw;
    font-size: 20px;

    .icon {
      padding: 2vw;
      vertical-align: middle;
      border-radius: 2vw;

      &.colorful {
        color: @m-color-1;
        background: @color-4;
      }

      &.white {
        color: @color-4;
        background: @m-color-1;
      }

      &.hide {
        display: none;
      }
    }
  }
}
</style>
