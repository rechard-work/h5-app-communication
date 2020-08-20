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
    <buoyPopup addclass="floatingWindow"></buoyPopup>
  </div>
</template>

<script>
import toMiniProgram from '@/common/js/toMiniProgram.js'
import buoyPopup from '@/components/buoyPopup/index'
export default {
  data () {
    return {
      value: ''
    }
  },
  components: {
    buoyPopup
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
