<template>
    <div class="search">
      <input v-model="value">
      <van-button type="primary" size="mini" @click="toMiniProgram">跳转小程序</van-button>
    </div>
</template>

<script>
import device from '@/common/js/device.js'
export default {
  data () {
    return {
      value: ''
    }
  },
  methods: {
    toMiniProgram () {
      device.jumpToMiniProgramPage('pages/pay/pay?param=48654654')
      // wx.miniProgram.postMessage({data: 344324})
      // wx.miniProgram.navigateTo({url: 'pages/pay/pay?param=48654654'})
    }
  }
}
</script>

<style scoped lang='less'>
.search{
  font-size: 14px;
}
</style>
