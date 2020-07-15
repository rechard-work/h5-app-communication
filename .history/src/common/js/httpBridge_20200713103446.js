/* eslint-disable */
import { baseURL, ResourceServerList } from '../../api/constants'
import axios from 'axios'
import util from './util'
import { loginOut, loginCallBack } from './login'
import { localStorageService } from './storage'
import device from './device'
import { checkTokenExpire, refreshToken } from '../../service/login'
import router from '../../router'
import store from '../../store'
import { jumpToLogin } from '../../platformApi'
import { formatLoginParams } from '../../platformApi/Login/login'

/**
 * 设置http接口请求留痕信息
 * @param {*} _
 */
let _getHXSClientInfo = _ => {
  let openId = localStorageService.get('openid') || ''
  let deviceInfo = localStorageService.get('deviceInfo') || {}
  deviceInfo = Object.keys(deviceInfo).length ? deviceInfo : { eAccount: {} }
  let mpn = deviceInfo.eAccount.mobile || ''
  let TPPID = ''
  if (device.isWeChat()) {
    TPPID = 'wx'
  }
  if (device.isWeChatMini()) {
    TPPID = 'xcx'
  }
  let HXSClientInfo = `OTH:WID:${openId};MPN:${mpn};TPPID:${TPPID}`
  return HXSClientInfo
}

axios.interceptors.request.use(
  async req => {
    if (!req.params) return req
    // 当前用户已登录并且本地token失效,需校验服务器上当前用户token是否失效
    if (
      localStorageService.get('eNoLoginStatus') &&
      !localStorageService.get('token-effective') &&
      !req.params.dontNeedToken
    ) {
      let deviceInfo = localStorageService.get('deviceInfo')
      deviceInfo = Object.keys(deviceInfo).length
        ? deviceInfo
        : { eAccount: {} }
      let params = {
        token: deviceInfo.eAccount.mobile
      }
      try {
        await checkTokenExpire()
      } catch (e) {
        // 阻止请求
        return Promise.reject({ errno: -999 })
      }
      // 服务器上当前用户token未失效,刷新token并更新过期时间
      await refreshToken(params)
    }
    req.params && delete req.params.dontNeedToken
    req.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    req.headers['HXSC-ClientInfo'] = _getHXSClientInfo()
    // 本地token已过期,且refreshToken刷新失败,不传token
    const tradeToken = localStorageService.get('trade-token')
    const ehtToken = localStorageService.get('eht-token')
    if (tradeToken) {
      req.headers['trade-token'] = tradeToken
    }
    if (ehtToken) {
      req.headers['eht-token'] = ehtToken
    }
    return req
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error)
  }
)

// 返回拦截 判断headers 是否有tokenrefresh等于true  Y刷新token
axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    if (response.headers['tokenrefresh'] === 'true') {
      let deviceInfo = localStorageService.get('deviceInfo')
      deviceInfo = Object.keys(deviceInfo).length
        ? deviceInfo
        : { eAccount: {} }
      refreshToken({
        token: deviceInfo.eAccount.mobile
      })
    }
    return response
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error)
  }
)
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
    },
    // 处理跳转
    async handleJumpToNative(params, callback) {
      let JumpToNativeCallBack = url => {
        return new Promise((resolve, reject) => {
          let _uuid = util.getGUID()
          let { hash, search, origin, pathname } = window.location
          let href = origin + pathname
          let hashQuery = new util.UrlParameters(hash)
          hash = hash.split('?')[0]
          // 防止小程序回调带上ehtToken, tradeToken, tradeType, openid
          delete hashQuery.ehtToken
          delete hashQuery.tradeToken
          delete hashQuery.tradeType
          delete hashQuery.openid
          if (Object.keys(hashQuery).length > 0) {
            hash += '?' + util.parseParam(hashQuery)
          }
          // 默认带给小程序页面的参数
          let defaultQuery = `?href=${encodeURIComponent(
            href
          )}&hash=${encodeURIComponent(hash)}&search=${encodeURIComponent(
            search
          )}&uuid=${_uuid}`
          if (url.indexOf('?') >= 0) {
            defaultQuery = defaultQuery.replace('?', '&')
          }
          // Android小程序不执行visibilitychange
          store.commit('SET_DOCUMENT_HIDDEN', true)
          // hashchange的监听事件
          let hashchangeFunc = _ => {
            store.commit('SET_DOCUMENT_HIDDEN', false)
            let { callback: result, uuid } = new util.UrlParameters()
            // 防止其他代码改变hash值影响到当前回调
            if (_uuid === uuid) {
              // 防止回调参数未取到
              try {
                result = decodeURIComponent(result)
                result = JSON.parse(result || '{}')
              } catch (e) {
                result = {}
              }
              resolve(result)
              // 由于小程序改变了页面的hash，需要返回
              history.back()
              // 移除当前hashchange的监听
              window.removeEventListener('hashchange', hashchangeFunc)
            }
          }
          // 跳转到对应页面
          wx.miniProgram.navigateTo({
            url: `${url}${defaultQuery}`
          })
          // 监听hash变更，由于小程序没有api去实现小程序->的通讯，只能通过改变页面的hash传递消息
          // 改变hash并不会导致webview刷新
          // 2020-02-26 16:25:37:暂时未发现其他问题
          window.addEventListener('hashchange', hashchangeFunc)
        })
      }
      const paramsJson = JSON.parse(params)
      let url = paramsJson.jumpinfo
      // 登录处理
      if (url.indexOf('hx168ms://login') === 0) {
        let query = new util.UrlParameters(url)
        if (device.isWeChatMini()) {
          // 微信小程序环境
          let queryString = util.parseParam(query)
          url = '/pages/login/login' + (queryString ? '?' : '') + queryString
          JumpToNativeCallBack(url).then(result => {
            let { errNo, errMsg, res } = result
            if (errNo >= 0) {
              let { userInfo, ehtToken, tradeToken } = res
              // 登录成功
              loginCallBack({
                userInfo,
                ehtToken,
                tradeToken
              })
            }
            callback(errNo, errMsg, res)
          })
        } else if (device.isWeChat()) {
          formatLoginParams()
          // 微信公众号页面
        } else if (device.isBrower()) {
          // 普通浏览器页面
          router.push({
            pathname: '/login',
            query: {
              ...query,
              backurl: encodeURIComponent(location.hash.replace('#/', ''))
            }
          })
        }
        return false
      }
      // 在微信小程序内
      if (device.isWeChatMini()) {
        url = util.hx168msToHttp(url)
        if (url) {
          if (url.indexOf('/pages/') < 0) {
            url = '/pages/mpwebview/mpwebview?url=' + encodeURIComponent(url)
          }
          console.log('跳转到小程序页面:', url)
          JumpToNativeCallBack(url).then(result => {
            let { errNo, errMsg, res } = result
            if (errNo >= 0) {
              let { userInfo, ehtToken, tradeToken } = res
              if (userInfo && (ehtToken || tradeToken)) {
                loginCallBack({
                  userInfo,
                  ehtToken,
                  tradeToken
                })
              }
            }
            callback(errNo, errMsg, res)
          })
        }
        return false
      }
      if (url.indexOf('hx168ms://hxwebview') === 0) {
        let query = new util.UrlParameters(url)
        if (query.module === 'pay') {
          try {
            await checkTokenExpire()
          } catch (e) {
            return jumpToLogin(1)
          }
          // todo 
          // if(process.env.NODE_ENV === "production"){
          window.location.href = util.hx168msToHttp(url)
          // }else{
            // window.location.href = `${ResourceServerList}/${query.module}${decodeURIComponent(query.param)}`
          // }
          return false;
        }
      }
      window.location.href = `https://fw.hx168.com.cn/zhapp/appWeb/api/static/download/index.html?url=${encodeURIComponent(
        url
      )}`
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
    MSReportUserAction(params, callback) {
      let {
        reportType,
        objectId,
        eventType,
        actionId,
        attributes,
        subReportType
      } = JSON.parse(params)
      reportType = +reportType
      subReportType = +subReportType
      // 控件埋点
      if (reportType === 1) {
        TKStat.event(objectId, eventType, actionId, attributes)
        return false
      }
      // 页面埋点
      if (reportType === 2) {
        if (subReportType === 1) {
          TKStat.visitPage(objectId)
        } else if (subReportType === 2) {
          TKStat.visitPageFinish(objectId)
        }
      }
    }
  }
  win.hxHTTPBridge = httpBridge
})(window)
