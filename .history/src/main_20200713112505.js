// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './common/js/rem'

import Vue from 'vue'
import App from './App'
import router from './router'

import jsBridge from './common/js/jsBridge.js'
import jsBridgeCopy from './common/js/jsBridge_copy.js'

import Vant from 'vant'
import 'vant/lib/index.css'

Vue.use(Vant)
Vue.config.productionTip = false
// Vue.prototype.$bridge = window.hxWebBridge
console.log(jsBridge)
Vue.prototype.$bridge = jsBridge
Vue.prototype.$bridge = jsBridgeCopy
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
