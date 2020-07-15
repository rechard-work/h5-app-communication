<template>
  <div class='pages'>
    <headernav ref="headerNav" :title="title"></headernav>
    <div class="nav">
      <ul class="list">
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
      </ul>
    </div>
    <div class="flex wrapper" ref="wrapper">
      <div class="content">
        <h1>{{ msg }}</h1>
        <h2>Essential Links</h2>
        <ul>
          <li>ssd</li>
          <li>ssd</li>
          <li>ssd</li>
          <li>ssd</li>
          <li>ssd</li>
          <li>ssd</li>
          <li>ssd</li>
          <li>ssd</li>
          <li>ssd</li>
          <li>ssd</li>
          <li>ssd</li>
          <li>ssd</li>
          <li>ssd</li>
          <li>ssd</li>
          <li>ssd</li>
          <li>ssd</li>
          <li>ssd</li>
          <li>ssd</li>
          <li>ssd</li>
          <li>ssd</li>
          <li>ssd</li>
          <li>ssd</li>
          <li>ssd</li>
          <li>ssd</li>
          <li>ssd</li>
          <li>ssd</li>
          <li>ssd</li>
          <li>ssd</li>
        </ul>
        <h2>Ecosystem</h2>
      </div>
    </div>
    <vuefooter></vuefooter>
  </div>
</template>

<script>
import headernav from '../components/header.vue'
import vuefooter from '../components/footer.vue'
import BScroll from 'better-scroll'// 引入better-scroll
export default {
  name: 'HelloWorld',
  data () {
    return {
      title: 'demo',
      msg: 'Welcome to Your Vue.js App',
      scroll: null
    }
  },
  components: {
    headernav,
    vuefooter
  },
  mounted () {
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true
      })
    })
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
.nav{
  height: 36px;
  width: 100%;
  overflow: auto;
  .list{
    display: flex;
    flex-direction: row;
    height: 100%;
    width: auto;
    li{
      width: 40px;
      padding: 0 30px;
      height: 100%;
      border-right: 1px solid #999;
      margin: 0 !important;
      .border-bottom-1px(#999)
    }
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
  margin: 30px 0;
  font-size: 16Px;
}
a {
  color: #42b983;
}

</style>
