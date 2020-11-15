<template>
  <div class="com-home-card" @click="goSurprise">
    <div class="title">{{ data.title }}</div>
    <div v-if="handlerStatus" class="handler-box">
      <div class="handler">
        <i class="ri-edit-2-fill"></i>
      </div>
      <div class="handler">
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
      default: false
    }
  },
  methods: {
    goSurprise () {
      this.$router.push({
        name: 'Surprise',
        query: {
          type: 'go',
          id: this.data.id
        }
      })
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
  }
}
</style>
