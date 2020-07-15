/* eslint-disable vue/valid-template-root */
<template>
  <div class='hello'>
    <headernav ref="headerNav" :title="title" @click="titleClick"></headernav>
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li>ssd</li>
    </ul>
    <h2>Ecosystem</h2>
  </div>
</template>

<script>
import headernav from '../components/header.vue'
export default {
  name: 'HelloWorld',
  data () {
    return {
      title: 'demo',
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: {
    headernav
  },
  mounted () {
    document.title = this.title
    this.appCall()
  },
  methods: {
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
<style scoped lang='less'>
@import '../common/css/mixin.less';
.nav-bar {
  display: flex;
  justify-content:center;
  align-items: center;
  height: 36px;
  /deep/.van-nav-bar__title{
    font-weight: normal;
  }
  .left-item,.right-item{
    display: flex;
    align-items: center;
  }
  /deep/.van-nav-bar__left, .van-nav-bar__right{
    padding: 0 10px;
  }
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
