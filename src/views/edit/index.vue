<template>
  <div class="page-edit">
    <div class="banner">
      <input ref="input" v-model="title" type="text" placeholder="这里输入一个名字" @change="changeTitle"/>
      <span class="quick-btn" @click="goSurprise">马上来一签</span>
    </div>
    <div class="top">
      <Mark
        v-for="item in res.mark"
        :key="item.title"
        :data="item"
        :showOpt="markStatus === 1"
        @on-remove="removeMark(item)"
        @mousedown.native="toggleMark(item)" />
    </div>
    <div class="bottom">
      <Mark
        v-for="item in res.hideMark"
        :key="item.title"
        :data="item"
        :showOpt="markStatus === 1"
        :hide="true"
        @on-remove="removeMark(item)"
        @mousedown.native="toggleMark(item)" />
    </div>
    <div class="bottom-btn-box">
      <div class="btn btn-s" @mousedown="markStatus === 0 ? handleRemoveMark() : handleCancel()">{{markStatus === 0 ? '编辑' : '完成'}}</div>
      <div class="btn btn-m" @mousedown="handleAddMark">添加</div>
    </div>
    <BaseMask v-if="addMaskState" @cancel="closeMask">
      <div class="input-box">
        <input ref="mackInput" class="mask-input" v-model="markInput" placeholder="想要什么呢？" type="text" @keypress.enter="addMark">
        <div class="mask-btn" @mousedown="addMark">添加</div>
      </div>
    </BaseMask>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Mark from './components/Mark'
import BaseMask from '@/components/BaseMask'

export default {
  name: 'Edit',
  components: { Mark, BaseMask },
  data: () => ({
    pageStatus: 'create',
    res: {},
    addMaskState: false,
    title: '',
    markInput: '',
    markStatus: 0 // 0 啥也没有；1 下签可删除
  }),
  computed: {
    ...mapState({
      markBoxs: state => state.mark.boxs
    })
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      if (this.$route.query.type === 'edit') {
        this.pageStatus = 'edit'
        this.$store.dispatch('app/changeHeaderTitle', { title: '' })
        this.edit()
      }
      if (this.$route.query.type === 'create') {
        this.pageStatus = 'create'
        this.$store.dispatch('app/changeHeaderTitle', { title: '新建' })
        this.create()
      }
      this.$store.dispatch('app/changeHeaderTheme', { theme: 'white' })
    },
    edit () {
      this.res = this.markBoxs.find(item => item.id === this.$route.query.id)
      this.title = this.res.title
    },
    create () {
      //
    },
    changeTitle () {
      this.res.title = this.title
      this.$store.dispatch('mark/update', this.res)
    },
    goSurprise () {
      this.$router.push({
        name: 'Surprise',
        query: { id: this.res.id }
      })
    },
    closeMask () {
      this.addMaskState = false
      this.markInput = ''
    },
    handleRemoveMark () {
      this.markStatus = 1
    },
    handleCancel () {
      this.markStatus = 0
    },
    handleAddMark () {
      this.addMaskState = true
      this.$nextTick(() => {
        this.$refs.mackInput.focus()
      })
    },
    addMark () {
      if (this.markInput.trim()) {
        this.res.mark.push({ title: this.markInput.trim() })
        this.$store.dispatch('mark/update', this.res)
      }
      this.markInput = ''
    },
    removeMark (mark) {
      // TODO 处理重名问题
      console.log('remove', mark)
      const index = this.res.mark.findIndex(item => item.title === mark.title)
      if (index > -1) {
        // 删除上面的
        this.res.mark.splice(index, 1)
      } else {
        // 删除下面的
        const index2 = this.res.hideMark.findIndex(item => item.title === mark.title)
        this.res.hideMark.splice(index2, 1)
      }
      this.$store.dispatch('mark/update', this.res)
    },
    toggleMark (mark) {
      const index = this.res.mark.findIndex(item => item.title === mark.title)
      console.log(index, this.res)
      if (index > -1) {
        // 上面移到下面
        if (this.res.mark.length === 1) {
          // TODO 提示上面最少得有一个
          return
        }
        if (!this.res.hideMark) {
          this.res.hideMark = []
        }
        this.res.hideMark.push(this.res.mark[index])
        this.res.mark.splice(index, 1)
      } else {
        // 上面移到下面
        const index2 = this.res.hideMark.findIndex(item => item.title === mark.title)
        if (!this.res.mark) {
          this.res.mark = []
        }
        this.res.mark.push(this.res.hideMark[index2])
        this.res.hideMark.splice(index2, 1)
      }
      this.$store.dispatch('mark/update', this.res)
    }
  }
}
</script>
<style lang="less" scoped>
.page-edit {
  position: relative;
  padding-bottom: 30vw;

  input {
    padding: 6px;
    font-size: 24px;
    color: @m-color-1;
    text-align: center;
    letter-spacing: 2px;
    background: transparent;
    border: none;

    &:focus {
      text-align: left;
      border-bottom: 1px solid @m-color-3;
    }
  }

  .mask-input {
    flex: 1;
    width: 69vw;
    color: @m-color-9;
    border-bottom: 1px solid @color-3;
  }

  .banner {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 64vw;
    font-size: 24px;
    color: @m-color-1;
    letter-spacing: 2px;
    background: @color-3;

    .quick-btn {
      padding: 1vw 4vw;
      margin: 10vw 0 -10vw;
      font-size: 17px;
      border: 1px solid @m-color-2;
      border-radius: 10vw;
      transition: transform 0.2s ease;

      &:active {
        transform: scale(0.9);
      }
    }
  }

  .top {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 6vw 6vw 1vw;
    border-bottom: 1px solid @m-color-3;
  }

  .bottom {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 6vw;
  }

  .input-box {
    display: flex;
    justify-content: center;
    width: 88vw;

    .mask-btn {
      display: flex;
      flex: 0 0 1;
      align-items: center;
      justify-content: center;
      min-width: 16vw;
      height: 10vw;
      margin-left: 3vw;
      font-size: 16px;
      color: @m-color-1;
      user-select: none;
      background: @color-5;
      border-radius: 2vw;
      transition: all 0.2s ease;

      &:active {
        transform: scale(0.9);
      }
    }
  }

  .bottom-btn-box {
    position: fixed;
    bottom: 6vw;
    left: 3vw;
    z-index: 10;
    display: flex;
    justify-content: space-between;
    width: 94vw;

    .btn {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 16vw;
      font-size: 20px;
      color: @m-color-1;
      letter-spacing: 2px;
      background: @color-5;
      border-radius: 3vw;
      transition: all 0.2s ease;

      &::after {
        position: absolute;
        bottom: 0;
        left: 10%;
        z-index: -1;
        display: block;
        width: 80%;
        height: 50%;
        content: '';
        border-radius: 6vw;
        box-shadow: 0 3vw 6vw -3vw @color-7;
      }

      &:active {
        transform: scale(0.9);
      }
    }

    .btn-s {
      width: 20vw;
      margin-right: 1vw;
    }

    .btn-m {
      // width: 70vw;
      flex: 1;
    }
  }
}
</style>
