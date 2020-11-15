<template>
  <div class="page-home">
    <Card v-for="item in markBoxs" :key="item.id" :data="item" />
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
  }
}
</script>

<style lang="less" scoped>
.page-home {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 3vw;
  margin-top: 60px;
}
</style>
