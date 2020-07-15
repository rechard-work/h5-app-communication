// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './common/js/rem'

import Vue from 'vue'
import App from './App'
import router from './router'
import { hideNavBar } from './common/js/callOrigin.js'
import './common/js/jsBridge.js'

import Vant from 'vant'
import 'vant/lib/index.css'
import './common/js/httpBridge.js'

console.log(window)

Vue.use(Vant)
Vue.prototype.$bridge = window.hxWebBridge

hideNavBar()

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
