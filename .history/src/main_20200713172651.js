// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './common/js/rem'
import './common/css/basic.css'
import Vue from 'vue'
import App from './App'
import router from './router'
import './common/js/httpBridge.js'
import { hideNavBar, setPreventGoBack } from './common/js/callOrigin.js'
import './common/js/jsBridge.js'

import Vant from 'vant'
import 'vant/lib/index.css'

import wx from './common/js/weixin-js-sdk'

Vue.use(Vant)
Vue.use(wx)
Vue.prototype.$bridge = window.hxWebBridge

hideNavBar()
setPreventGoBack()

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
