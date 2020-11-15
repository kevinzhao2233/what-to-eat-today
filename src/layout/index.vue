<template>
  <div id="layout">
    <Header/>
    <router-view/>
  </div>
</template>

<script>
import Header from './components/Header'

export default {
  name: 'Layout',
  components: { Header }
}
</script>

<style lang="less" scoped>
#layout {
  height: 100%;
}
</style>
