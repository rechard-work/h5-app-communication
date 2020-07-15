<template>
  <div class='hello'>
    <van-nav-bar class='nav-bar' @click-left="onClickLeft" v-if="!device">
      <div class='left-item' slot='left'>
        <i class='icon-back' />
        <span>返回</span>
      </div>
      <div name='title' class='title' slot='title' @click='titleClick'>
        <span>{{ title }}</span>
      </div>
    </van-nav-bar>
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li>ssd</li>
    </ul>
    <h2>Ecosystem</h2>
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
      device: device.isWeChat()
    }
  },
  mounted () {
    this.appCall()
    this.callAPP()
  },
  methods: {
    onClickLeft () {
      exitWebView()
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
</style>
