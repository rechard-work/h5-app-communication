import './jsBridge'
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
export function hideNavBar () {
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
