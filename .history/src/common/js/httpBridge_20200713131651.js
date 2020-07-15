/* eslint-disable */
;(function(win) {
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
        default:
          break
      }
    },
    async gateRequest (params, callback) {

    }
  }
  win.hxHTTPBridge = httpBridge
})(window)
