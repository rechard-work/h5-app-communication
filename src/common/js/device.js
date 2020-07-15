/* eslint-disable */
/**
 * 获取设备类型 封装device
 */

let device = {
    userAgent: window.navigator.userAgent.toLowerCase()
  }
  
  const api = {
    ios() {
      return this.iphone() || this.ipod() || this.ipad()
    },
    iphone() {
      return !this.windows() && find('iphone')
    },
    ipod() {
      return find('ipod')
    },
    ipad() {
      return find('ipad')
    },
    android() {
      return !this.windows() && find('android') && find('mobile')
    },
    isAndroid() {
      // 华彩Android
      return (
        window.hxAndroidBridge !== undefined ||
        (this.isFcMini() && this.android())
      )
    },
    isIOS() {
      // 华彩IOS
      return (
        (window.webkit &&
          window.webkit.messageHandlers.hxiOSBridge !== undefined) ||
        window.hxiOSBridge !== undefined ||
        (this.isFcMini() && this.ios())
      )
    },
    isWeChat() {
      // 微信内置浏览器
      return find('micromessenger') && !this.isWeChatMini()
    },
    isWeChatMini() {
      // 微信小程序WebView
      return (
        window.__wxjs_environment === 'miniprogram' ||
        /miniProgram/i.test(navigator.userAgent.toLowerCase())
      )
    },
    isWeChatMiniAsync() {
      return this.__getMiniEnv('wx')
    },
    windows() {
      return find('windows')
    },
    mobileApp() {
      return (
        !this.isWeChat() &&
        !this.isMini() &&
        (this.iphone() || this.android() || this.ipod())
      )
    },
    tablet() {
      return this.ipad() || this.isWeChat()
    },
    isYCF() {
      // 赢财富webview下的ua
      return find('thinkive')
    },
    isBrower() {
      // 非赢财富, 非华彩app, 非微信, 非QQ
      return (
        !this.isYCF() &&
        !this.ishcApp() &&
        !this.isWeChat() &&
        !this.isWeChatMini() &&
        !this.isQQ()
      )
    },
    ishcApp(USE_AXIOS_REQUEST) {
      //  判断是否华彩人生APP环境
      return this.isAndroid() || this.isIOS() || this.isFcMini()
    },
    ishcAppOri() {
      //  华彩app挂载webview下的判断是否Android(IOS)
      return (this.isAndroid() || this.isIOS()) && !this.isFcMini()
    },
    isFcMini() {
      return (
        window.__fcjs_environment &&
        window.__fcjs_environment.toLocaleLowerCase() === 'miniprogram'
      )
    },
    isFcMiniAsync() {
      return this.__getMiniEnv('fc')
    },
    // 异步获取小程序环境变量, 尽量仅在入口文件处调用
    __getMiniEnv(type = 'wx') {
      return new Promise(resolve => {
        let isMiniProgram = type === 'wx' ? this.isWeChatMini() : this.isFcMini()
        // 已成功判断是小程序页面, 不做小程序API调用
        if (isMiniProgram) {
          return resolve(true)
        }
        window[type] && window[type].miniProgram.getEnv(function(res) {
          // 是小程序页面, 强行赋值__fcjs_environment以便未及时同步
          if (res.miniprogram) {
            window[`__${type}js_environment`] = 'miniprogram'
          }
          resolve(res.miniprogram)
        })
        setTimeout(_ => {
          resolve(false)
        }, 500)
      })
    },
    isQQ() {
      return find('qq')
    },
    isMini() {
      // 小程序
      return this.isWeChatMini() || this.isFcmini()
    }
  }
  
  function find(needle) {
    return device.userAgent.indexOf(needle) !== -1
  }
  
  Object.assign(device, api)
  export default device
  