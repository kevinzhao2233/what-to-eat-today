<template>
  <div class="layout-header">
    <span class="title">{{ header.title }}</span>
    <div class="opt">
      <i class="icon ri-more-fill"></i>
      <div v-if="isShowOpt" class="opt-box">
        <div v-for="item in header.options" :key="item.name" class="item">{{ item.name }}</div>
      </div>
    </div>
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

  mounted () {
    this.$store.dispatch('app/changeHeaderTitle', { title: '今天吃什么呀？' })
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
  background: #fa525211;

  .title {
    font-size: 20px;
  }

  .opt {
    position: relative;
    width: 32px;
    height: 30px;
    text-align: center;
    background: @m-color-1;
    border-radius: 6px;

    .icon {
      font-size: 20px;
      line-height: 30px;
      color: @m-color-6;
    }

    .opt-box {
      position: absolute;
      top: 20px;
      right: 0;
      padding: 4px 0;
      overflow: hidden;
      background: @m-color-1;
      border: 1px solid @m-color-4;
      border-radius: 6px;

      .item {
        display: inline-block;
        padding: 4px 16px;
        text-align: left;
        white-space: nowrap;
      }
    }
  }
}
</style>
