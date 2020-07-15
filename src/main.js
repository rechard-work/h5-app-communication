// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './common/js/rem'
import './common/css/basic.css'
import Vue from 'vue'
import App from './App'
import router from './router'
import './common/js/httpBridge.js'
import { hideNavBar } from './common/js/callOrigin.js' //, setPreventGoBack
import './common/js/jsBridge.js'

import Vant from 'vant'
import 'vant/lib/index.css'

Vue.use(Vant)
Vue.prototype.$bridge = window.hxWebBridge

// 隐藏原生app导航栏
hideNavBar()
// 阻止原生app返回键触发
// setPreventGoBack()

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
