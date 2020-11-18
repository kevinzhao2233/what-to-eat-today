<template>
  <div class="page-home">
    <Card v-for="item in markBoxs" :key="item.id" :data="item" :showOpt="boxEditStatus" />
    <div class="bottom-btn-box">
      <div class="btn btn-s" @mousedown="!boxEditStatus ? handleEditBox() : handleCancel()">{{boxEditStatus ? '完成' : '编辑'}}</div>
      <div class="btn btn-m" @mousedown="handleAddBox">添加签盒</div>
    </div>
  </div>
</template>

<script>
import { random } from '@/tools'
import { mapState } from 'vuex'
import Card from './components/Card'

export default {
  name: 'Home',
  components: { Card },
  data: () => ({
    boxEditStatus: false
  }),
  computed: {
    ...mapState({
      markBoxs: state => state.mark.boxs
    })
  },
  created () {
    this.$store.dispatch('app/changeHeaderTitle', { title: '今天吃什么？' })
    this.$store.dispatch('app/changeHeaderTheme', { theme: 'hide' })
  },
  methods: {
    handleEditBox () {
      this.boxEditStatus = true
    },
    handleCancel () {
      this.boxEditStatus = false
    },
    handleAddBox () {
      // 生成 id，跳转到 edit 页，添加默认的 box
      const id = random(1000000, 9999999)
      console.log('随机数', id)
      this.$store.dispatch('mark/addMarkBox', { id })
      this.$router.push({
        name: 'Edit',
        query: {
          type: 'create',
          id
        }
      })
    }
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
}
</style>
