<template>
    <div class="search">
      <van-field v-model="value" label="文本" placeholder="可在此处输入值测试页面是否会被刷新" />
      <van-button type="primary" size="mini" @click="toMiniProgram">跳转小程序</van-button>
    </div>
</template>

<script>
import toMiniProgram from '@/common/js/toMiniProgram.js'
export default {
  data () {
    return {
      value: ''
    }
  },
  methods: {
    toMiniProgram () {
      var url = '/pages/pay/pay?a=1&b=2'
      let msg = `\r\n\r\n当前location.href值为: ${location.href}\r\n并且马上返回上级页面防止url污染`
      toMiniProgram.jumpToMiniProgramPage(url)
        .then(({ errNo, errMsg, res }) => {
          alert(`${errMsg}: ${JSON.stringify(res)}`)
        })
        .catch(({ errNo, errMsg, res }) => {
          alert(`获取失败: ${errMsg}` + msg)
        })
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
