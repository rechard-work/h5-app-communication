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

// 隐藏原生导航栏
export function hideNavBar() {
  hxWebBridge.postNotification(
    "HXHeaderConfig",
    {
      hidden: 1,
      __pageid: window.hxPageID,
      bounces: 2
    },
    function(errNo, errMsg, res) {
      if (errMsg !== null && errMsg !== "undefined" && errMsg !== "null") {
        console.log("HXHeaderConfig-failure", errNo, errMsg, res);
      } else {
        console.log("HXHeaderConfig-success", errNo, errMsg, res);
      }
    }
  );
}