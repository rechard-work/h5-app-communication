/* eslint-disable vue/valid-template-root */
<template>
  <div class='hello'>
    <van-nav-bar class='nav-bar' @click-left="onClickLeft" @click-right="onClickRight" v-if="!device">
      <div class='left-item' slot='left'>
        <van-icon name="arrow-left" color="#2c3e50" size="1.2em"/>
        <span>返回</span>
      </div>
      <div name='title' class='title' slot='title' @click='titleClick'>
        <span>{{ title }}</span>
      </div>
      <div class="right-item" slot="right">
        <i class="iconfont">&#xe655;</i>
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
import wx from 'weixin-js-sdk'
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
  created () {
    alert(5156)
    wx.ready(function () {
      alert(2666)
      wx.updateAppMessageShareData({
        title: '', // 分享标题
        desc: '', // 分享描述
        link: '', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: '', // 分享图标
        success: function () {
          // 设置成功
        }
      })
    })
  },
  mounted () {
    document.title = this.title
    this.appCall()
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

.popup {
  &.van-popup--bottom {
    border-radius: unit(20px/37.5, rem) unit(20px/37.5, rem) 0 0;
    .text-center.border-bottom-1px {
      font-size: 16px;
      padding: 10px 0;
      .border-bottom-1px(#666)
    }
  }
}

</style>
