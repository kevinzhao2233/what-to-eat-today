<template>
  <div class="com-edit-mark">
    <span class="txt">{{data.title}}</span>
    <div class="opt">
      <i class="ri-close-circle-fill"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Mark',
  props: {
    data: {
      type: Object,
      default: null
    }
  }
}
</script>

<style lang="less">
.com-edit-mark {
  position: relative;
  display: inline-block;
  width: 40vw;
  height: 10vw;
  margin-bottom: 5vw;
  overflow: hidden;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: top;
  border: 1px solid @color-4;
  border-radius: 2vw;

  &.hide {
    border: 1px solid @m-color-4;
  }

  .txt {
    font-size: 16px;
    line-height: 9.5vw;
  }

  .opt {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 12vw;
    height: 10vw;

    i {
      font-size: 20px;
      color: @color-5;
      text-shadow: 1px 3px 6px @color-2;
    }
  }
}
</style>
