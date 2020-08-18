<template>
  <div class="search">
    <van-field
      v-model="value"
      label=""
      placeholder="可在此处输入值测试页面是否会被刷新"
    />
    <van-button type="primary" size="small" @click="toMiniProgram"
      >h5跳小程序</van-button
    >
    <!-- 拖动浮窗 -->
    <div class="maskHidden" v-if="maskHidden"></div>
    <div
      class="floatingWindow"
      :style="{
        width: itemWidth + 'px',
        height: itemHeight + 'px',
        left: left + 'px',
        top: top + 'px'
      }"
      ref="floatingWindow"
    ></div>
  </div>
</template>

<script>
import toMiniProgram from '@/common/js/toMiniProgram.js'
export default {
  data () {
    return {
      value: '',
      clientWidth: 0,
      clientHeight: 0,
      left: 0,
      top: 0,
      itemWidth: 50,
      itemHeight: 50,
      gapWidth: 10,
      coefficientHeight: 0.8,
      maskHidden: false
    }
  },
  created () {
    // 初始化浮标
    this.clientWidth = document.documentElement.clientWidth
    this.clientHeight = document.documentElement.clientHeight
    this.left = this.clientWidth - this.itemWidth - this.gapWidth
    this.top = this.clientHeight * this.coefficientHeight
  },
  mounted () {
    this.getInnovaBoardPosition()
  },
  methods: {
    toMiniProgram () {
      var url = '/pages/pay/pay?a=1&b=2'
      let msg = `\r\n\r\n当前location.href值为: ${location.href}\r\n并且马上返回上级页面防止url污染`
      toMiniProgram
        .jumpToMiniProgramPage(url)
        .then(({ errNo, errMsg, res }) => {
          alert(`${errMsg}: ${JSON.stringify(res)}`)
        })
        .catch(({ errNo, errMsg, res }) => {
          alert(`获取失败: ${errMsg}` + msg)
        })
    },
    // 浮窗可拖动
    getInnovaBoardPosition () {
      this.$nextTick(() => {
        const floatingWindow = this.$refs.floatingWindow
        floatingWindow.addEventListener('touchstart', e => {
          e.stopPropagation()
          floatingWindow.style.transition = 'none'
          this.maskHidden = true
        })
        floatingWindow.addEventListener(
          'touchmove',
          e => {
            e.stopPropagation()
            if (e.targetTouches.length === 1) {
              let touch = event.targetTouches[0]
              this.left = touch.clientX - this.itemWidth / 2
              this.top = touch.clientY - this.itemHeight / 2
            }
          },
          false
        )
        floatingWindow.addEventListener('touchend', e => {
          e.stopPropagation()
          floatingWindow.style.transition = 'all 0.3s'
          if (this.left > this.clientWidth / 2) {
            this.left = this.clientWidth - this.itemWidth - this.gapWidth
          } else {
            this.left = this.gapWidth
          }
          if (this.top <= 36) {
            this.top = 36 + this.gapWidth
          } else {
            let bottom =
              this.clientHeight - 50 - this.itemHeight - this.gapWidth
            console.log(bottom, this.top)
            if (this.top >= bottom) {
              this.top = bottom
            }
          }
          this.maskHidden = false
        })
      })
    }
  }
}
</script>

<style scoped lang="less">
.floatingWindow {
  z-index: 20;
  transition: all 0.3s;
  position: fixed;
  top: 50%;
  background: rgba(56, 181, 77, 1);
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  .img {
    width: 70px;
  }
}
.search {
  font-size: 14px;
  padding-top: 15px;
  .van-cell {
    border: 1px solid #dedede;
    margin-bottom: 10px;
  }
}
</style>
