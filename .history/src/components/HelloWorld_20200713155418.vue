/* eslint-disable vue/valid-template-root */
<template>
  <div class='hello'>
    <van-nav-bar class='nav-bar' @click-left="onClickLeft" @click-right="onClickRight" v-if="!device">
      <div class='left-item' slot='left'>
        <i class='icon-back' />
        <span>返回</span>
      </div>
      <div name='title' class='title' slot='title' @click='titleClick'>
        <span>{{ title }}</span>
      </div>
      <div class="right-item" slot="right">
        <van-icon name="more-o" color='#000000' size="1.2em"/>
      </div>
    </van-nav-bar>
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li>ssd</li>
    </ul>
    <h2>Ecosystem</h2>
    <van-popup
      class="popup"
      v-model="popup_show"
      round
      position="bottom"
      :style="{ height: '40%' }"
    >
      <div class="text-center border-bottom-1px">分享</div>
    </van-popup>
  </div>
</template>

<script>
import { exitWebView } from './../common/js/callOrigin.js'
import device from './../common/js/device'
export default {
  name: 'HelloWorld',
  data () {
    return {
      title: 'demo',
      msg: 'Welcome to Your Vue.js App',
      device: device.isWeChat(),
      popup_show: false
    }
  },
  mounted () {
    document.title = this.title
    this.appCall()
    this.callAPP()
  },
  methods: {
    onClickLeft () {
      exitWebView()
    },
    onClickRight () {
      this.popup_show = true
    },
    titleClick () {
      this.callAPP()
    },
    // js调用app ==================================
    callAPP () {
      // let param = { jumpinfo: '', onlyHCWebview: true } // JS给APP传得参数
      this.$bridge.postNotification('MSGetNativeInfo', {}, function (
        errNo,
        errMsg,
        res
      ) {
        alert(res)
      })
    },
    // app调js =====================================
    // app调用js的方法 appCallJS, 需要注册
    appCall () {
      this.$bridge.registerHandler('appCallJS', (datas, responseCallback) => {
        alert('showStationList' + datas)
      })
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
.nav-bar {
  display: flex;
  justify-content:center;
  align-items: center;
}
h1,
h2 {
  font-weight: normal;
  font-size: 16px;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 30px;
}
a {
  color: #42b983;
}
.popup.van-popup--bottom {
  border-radius: unit(20px/37.5, rem) unit(20px/37.5, rem) 0 0;
}
.text-center{
  font-size: 18px;
}
.text-center::after{
  left: 0;
  bottom: 0;
  transform-origin: 0 bottom;
  border-bottom: 1px solid #e0e0e0;
}
</style>
