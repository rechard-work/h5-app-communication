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
      
    },
    async jumpToMiniProgramPage(url) {
      function getGUID() {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (
          c
        ) {
          var r = (Math.random() * 16) | 0,
            v = c == "x" ? r : (r & 0x3) | 0x8;
  
          return v.toString(16);
        });
      }
      return new Promise((resolve, reject) => {
        var _uuid = getGUID();
        var { hash } = window.location;
        var href = location.href.split("#")[0];
        // 带给小程序页面的参数
        let defaultQuery = Qs.stringify({
          href,
          hash,
          uuid: _uuid,
        });
        // query参数连接符
        let joiner = url.indexOf("?") < 0 ? "?" : "&";
        // hashchange的监听事件
        var hashchangeFunc = (_) => {
          var { callback: result, uuid } = Qs.parse(location.hash.split("?")[1]);
          // 防止其他代码改变hash值影响到当前回调
          if (_uuid === uuid) {
            // 防止回调参数未取到
            try {
              result = decodeURIComponent(result);
              result = JSON.parse(result || "{}");
            } catch (e) {
              result = {};
            }
            var { errNo, errMsg, res } = result;
            if (errNo >= 0) {
              resolve(result);
            } else {
              reject(result);
            }
            // 由于小程序改变了页面的hash，需要返回
            history.back();
            // 移除当前hashchange的监听
            window.removeEventListener("hashchange", hashchangeFunc);
          }
        }
        // alert(
        //   `当前location.href值为: ${location.href}\r\n\r\n跳转地址: ${url}${joiner}${defaultQuery}`
        // );
        // 跳转到对应页面, webview->小程序的通讯智能通过跳转小程序页面并且带入参数的方式
        wx.miniProgram.navigateTo({
          url: `${url}${joiner}${defaultQuery}`,
        })
        // 监听hash变更，由于小程序没有api去实现小程序->webview的通讯，只能通过改变页面的hash传递消息
        // 改变hash并不会导致webview刷新
        window.addEventListener("hashchange", hashchangeFunc)
      })  
    }
  }
  win.hxHTTPBridge = httpBridge
})(window)
