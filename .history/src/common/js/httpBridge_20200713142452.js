/* eslint-disable */
import device from './device'
;(function(win) {
  if(win.hxHTTPBridge){
    win.hxHTTPBridge !== undefined
  }
  var httpBridge = {
    handleNotification: async function(name, params, callback) {
      switch (name) {
        // 服务类请求
        case 'MSServiceNetworkRequest':
          this.gateRequest(params, callback)
          break
        // 服务类请求
        case 'MSTradeNetworkRequest':
          break
        // 行情类请求
        case 'MSQuoteNetworkRequest':
          break
        // 获取用户信息
        case 'MSGetNativeInfo':
          break
        // 获取用户信息
        case 'MSJumpToNative':
          this.handleJumpToNative(params, callback)
          break
        // 华彩原生loading
        case 'HXBodyHideLoading':
          return Promise.resolve()
        // 退出webview
        case 'HXHeaderClose':
          this.HXHeaderClose()
          return Promise.resolve()
        case 'MSReportUserAction':
          this.MSReportUserAction(params, callback)
        default:
          break
      }
    },
    HXHeaderClose() {
      if (device.isWeChatMini()) {
        wx.miniProgram.navigateBack()
      } else if (device.isWeChat()) {
        // 微信公众号页面
        history.go(-1)
      } else if (device.isBrower()) {
        history.go(-1)
      }
    },
    // 服务类请求
    async gateRequest(params, callback) {
      
    }
  }
  win.hxHTTPBridge = httpBridge
})(window)
