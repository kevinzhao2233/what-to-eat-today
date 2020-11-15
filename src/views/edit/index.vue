<template>
  <div class="page-edit">
    <div class="banner">
      <input v-if="editTitleState" ref="input" id="edit_banner_input" v-model="title" type="text" @change="changeTitle"/>
      <span v-else id="edit_banner_title" @mousedown.self="editTitle">{{res.title}}</span>
    </div>
    <div class="top">
      <Mark v-for="item in res.mark" :key="item.title" :data="item" @mousedown.native="toggleMark(item)" />
    </div>
    <div class="bottom">
      <Mark v-for="item in res.hideMark" :key="item.title" :data="item" @mousedown.native="toggleMark(item)" />
    </div>
    <div class="btn" @mousedown="handleAndMark">添加</div>
    <BaseMask v-if="addMaskState" @cancel="closeMask">
      <input class="mask-input" v-model="markInput" type="text" @keypress.enter="closeMask">
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
    res: {},
    editTitleState: false,
    addMaskState: false,
    title: '',
    markInput: ''
  }),
  computed: {
    ...mapState({
      markBoxs: state => state.mark.boxs
    })
  },
  created () {
    this.init()
  },
  mounted () {
    document.addEventListener('click', e => {
      if (e.target.id === 'edit_banner_title' || e.target.id === 'edit_banner_input') return
      this.editTitleState = false
    })
  },
  methods: {
    init () {
      if (this.$route.query.type === 'edit') {
        this.$store.dispatch('app/changeHeaderTitle', { title: '' })
        this.edit()
      }
      if (this.$route.query.type === 'create') {
        this.$store.dispatch('app/changeHeaderTitle', { title: '新建' })
        this.create()
      }
    },
    edit () {
      this.res = this.markBoxs.find(item => item.id === this.$route.query.id)
      this.title = this.res.title
    },
    create () {
      //
    },
    editTitle () {
      this.editTitleState = true
      this.$nextTick(() => {
        this.$refs.input.focus()
      })
    },
    changeTitle () {
      this.res.title = this.title
      this.$store.dispatch('mark/update', this.res)
    },
    closeMask () {
      if (this.markInput.trim()) {
        this.res.mark.push({ title: this.markInput.trim() })
        this.$store.dispatch('mark/update', this.res)
      }
      this.addMaskState = false
      this.markInput = ''
    },
    handleAndMark () {
      this.addMaskState = true
    },
    addMark (title) {
      this.res.mark.push({ title })
      this.$store.dispatch('mark/update', this.res)
    },
    toggleMark (mark) {
      const index = this.res.mark.findIndex(item => item.title === mark.title)
      console.log(index, this.res)
      if (index > -1) {
        // 上面移到下面
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

  input {
    padding: 6px;
    font-size: 24px;
    color: @m-color-1;
    letter-spacing: 2px;
    background: transparent;
    border: none;
    border-bottom: 1px solid @m-color-3;
  }

  .mask-input {
    color: @m-color-9;
    border-bottom: 1px solid @color-3;
  }

  .banner {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 64vw;
    font-size: 24px;
    color: @m-color-1;
    letter-spacing: 2px;
    background: @color-3;
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

  .btn {
    position: fixed;
    bottom: 6vw;
    left: 3vw;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 94vw;
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
}
</style>
