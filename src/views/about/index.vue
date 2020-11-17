<template>
  <div class="page-about">
    <div class="avatar"></div>
    <ul class="menu">
      <li class="item">
        <a href="mailto:kevin_2233@qq.com">意见和反馈</a>
      </li>
    </ul>
    <span class="version">version: {{version}}</span>
  </div>
</template>
<script>
import pack from '../../../package.json'

export default {
  name: 'About',
  data: () => ({
    version: ''
  }),
  created () {
    this.version = pack.version
  }
}
</script>
<style lang="less" scoped>
.page-about {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 60px 3vw 10vw;

  .avatar {
    width: 30vw;
    height: 30vw;
    margin: 20vw;
    background: @color-4;
    border-radius: 50%;
  }

  .menu {

    .item {
      font-size: 16px;
      a {
        color: @m-color-9;
        background: transparent;

        &:visited {
          color: @m-color-9;
          background: transparent;
        }

        &:hover {
          color: @m-color-9;
          background: transparent;
        }

        &:active {
          color: @m-color-8;
          background: transparent;
        }
      }
    }
  }

  .version {
    margin-top: auto;
    color: @m-color-7;
  }
}
</style>
