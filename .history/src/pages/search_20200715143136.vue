<template>
    <div class="search">
      <van-field v-model="value" label="" placeholder="可在此处输入值测试页面是否会被刷新" />
      <van-button type="primary" size="small" @click="toMiniProgram">h5跳小程序</van-button>
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
      wx.miniProgram.navigateTo({url})
      return
      toMiniProgram.jumpToMiniProgramPage(url)
        .then(({ errNo, errMsg, res }) => {
          alert(`${errMsg}: ${JSON.stringify(res)}`)
        })
        .catch(({ errNo, errMsg, res }) => {
          alert(`获取失败: ${errMsg}` + msg)
        })
    }
  }
}
</script>

<style scoped lang='less'>
.search{
  font-size: 14px;
  .van-cell{
    border: 1px solid #dedede;
  }
}
</style>
