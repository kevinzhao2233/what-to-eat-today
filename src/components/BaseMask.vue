<template>
  <div class="com-base-mask" @mousedown.self="cancel">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'BaseMask',
  methods: {
    cancel () {
      this.$emit('cancel')
    }
  }
}
</script>

<style lang="less" scoped>
.com-base-mask {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(@m-color-3, 0.8);
}
</style>
