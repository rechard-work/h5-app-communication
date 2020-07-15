<template>
  <div class='hello'>
    <van-nav-bar class='nav-bar'>
      <div class='left-item' slot='left'>
        <i class='icon-back' />
        <span>返回</span>
      </div>
      <div name='title' class='title' slot='title'>
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
export default {
  name: 'HelloWorld',
  data () {
    return {
      title: 'demo',
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted () {
    this.appCall()
    this.callAPP()
  },
  methods: {
    // js调用app ==================================
    callAPP () {
      let param = { jumpinfo: '', onlyHCWebview: true } // JS给APP传得参数
      this.$bridge.postNotification(
        'MSJumpToNative',
        param,
        function (errNo, errMsg, res) {
          console.log(res)
        }
      )
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
