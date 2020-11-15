<template>
  <div class="layout-header">
    <span class="title">{{ header.title }}</span>
    <div class="opt">
      <i class="icon ri-more-fill"></i>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Header',
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

    .icon {
      font-size: 20px;
      color: @m-color-6;
    }
  }
}
</style>
