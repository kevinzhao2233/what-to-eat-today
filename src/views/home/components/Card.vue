<template>
  <div class="com-home-card" @mousedown="goSurprise">
    <div class="title">{{ data.title }}</div>
    <div v-if="handlerStatus" class="handler-box">
      <div class="handler" @mousedown.stop="goEdit">
        <i class="ri-edit-2-fill"></i>
      </div>
      <div class="handler" @mousedown.stop="remove">
        <i class="ri-close-circle-fill"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    data: {
      type: Object,
      default: null
    },
    handlerStatus: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    // 去抽签
    goSurprise () {
      this.$router.push({
        name: 'Surprise',
        query: {
          id: this.data.id
        }
      })
    },
    // 去编辑
    goEdit () {
      this.$router.push({
        name: 'Edit',
        query: {
          type: 'edit',
          id: this.data.id
        }
      })
    },
    // 删除一个签盒
    remove () {
      this.$store.dispatch('mark/removeMarkBox', { id: this.data.id })
    }
  }
}
</script>

<style lang="less">
.com-home-card {
  position: relative;
  display: inline-block;
  width: 45vw;
  height: 60vw;
  padding: 4vw 3vw;
  margin-bottom: 8vw;
  vertical-align: top;
  background: @color-5;
  border-radius: 3vw;
  transition: 0.2s ease;

  &::after {
    position: absolute;
    bottom: 0;
    left: 10%;
    z-index: -1;
    display: block;
    width: 80%;
    height: 50%;
    content: '';
    border-radius: 8vw;
    box-shadow: 0 3vw 8vw -3vw @color-7;
  }

  &:active {
    transform: scale(0.9);
  }

  .title {
    font-size: 18px;
    color: @m-color-1;
  }

  .handler-box {
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 18vw;
    background: rgba(@m-color-4, 0.2);
    border-bottom-right-radius: 3vw;
    border-bottom-left-radius: 3vw;

    .handler {
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: center;
      height: 100%;

      i {
        font-size: 24px;
        color: @color-1;
      }
    }
  }
}
</style>
