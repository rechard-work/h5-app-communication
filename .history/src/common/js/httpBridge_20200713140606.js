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
          let tokenEffective = localStorageService.get('token-effective')
          let eNoLoginStatus = localStorageService.get('eNoLoginStatus')
          // 本地token有效
          if (tokenEffective) {
            let deviceInfo = localStorageService.get('deviceInfo')
            deviceInfo = Object.keys(deviceInfo).length
              ? deviceInfo
              : { eAccount: {} }
            callback(0, '', JSON.stringify(deviceInfo))
          } else {
            // 本地token失效, 登录状态有效
            if (eNoLoginStatus) {
              try {
                // 检测服务器token是否有效
                await checkTokenExpire()
              } catch (e) {
                // 阻止请求
                callback(0, '', '{}')
              }
              // 服务器上当前用户token未失效,刷新token并更新过期时间
              await refreshToken()
              return this.handleNotification(name, params, callback)
            }
            //   loginOut()
            callback(0, '', '{}')
          }
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
    // 服务类请求
    async gateRequest(params, callback) {
      let inParams = JSON.parse(params)
      let pathUrl = baseURL + (inParams.url || '/servlet/json')
      // inParams.url 毛磊的登录类接口,就不需要funcNo
      if (!inParams.url) {
        inParams.funcNo = inParams.__funcid || ''
      }
      delete inParams.url
      axios({
        url: pathUrl,
        baseURL: baseURL,
        params: inParams,
        method: 'get',
        timeout: 30000,
        withCredentials: true,
        crossDomain: true
      })
        .then(response => {
          return response.data
        })
        .then(res => {
          try {
            let result = {
              error_no: +res.error_no,
              error_info: res.error_info,
              dsName: ['DataSet'],
              DataSet: res.results || [res.data]
            }
            callback(+res.error_no, res.error_info, JSON.stringify(result))
          } catch (e) {
            console.log('回调异常: ' + e)
          }
        })
        .catch(err => {
          // error_no === -999,登录状态失效,不做通知
          callback(-1, '请求失败:' + err, '{}')
        })
    }
  }
  win.hxHTTPBridge = httpBridge
})(window)
