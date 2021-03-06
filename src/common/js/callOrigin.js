import './jsBridge'
let hxWebBridge = window.hxWebBridge
/**
 * 退出应用
 */
export function exitWebView (result = '') {
  console.log(result)
  hxWebBridge.postNotification(
    'HXHeaderClose',
    {
      __pageid: window.hxPageID,
      result: result
    },
    function (errNo, errMsg, res) {
      if (errMsg !== null && errMsg !== 'undefined' && errMsg !== 'null') {
        console.log('HXHeaderClose-failure', errNo, errMsg, res)
      } else {
        console.log('HXHeaderClose-success', errNo, errMsg, res)
      }
    }
  )
}
// 隐藏原生导航栏
export function hideNavBar (params, callback) {
  hxWebBridge.postNotification(
    'HXHeaderConfig',
    {
      hidden: 1,
      __pageid: window.hxPageID,
      bounces: 2
    },
    function (errNo, errMsg, res) {
      if (errMsg !== null && errMsg !== 'undefined' && errMsg !== 'null') {
        console.log('HXHeaderConfig-failure', errNo, errMsg, res)
      } else {
        console.log('HXHeaderConfig-success', errNo, errMsg, res)
      }
    }
  )
}
/**
 * 通知Android阻止原生返回键
 */
export function setPreventGoBack () {
  hxWebBridge.postNotification('setPreventGoBack', {}, function (
    errNo,
    errMsg,
    res
  ) {
    if (errMsg !== null && errMsg !== 'undefined' && errMsg !== 'null') {
      console.log('setPreventGoBack-failure', errNo, errMsg, res)
    } else {
      console.log('setPreventGoBack-success', errNo, errMsg, res)
    }
  })
}
