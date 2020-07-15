<template>
    <div class="header-nav">
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
import device from './../common/js/device'
import { exitWebView } from './../common/js/callOrigin.js'
export default {
  props: {
    title: {
      value: '',
      default: 'demo'
    }
  },
  data () {
    return {
      popup_show: false,
      device: device.isWeChat()
    }
  },
  methods: {
    onClickLeft () {
      exitWebView()
    },
    onClickRight () {
      this.popup_show = true
    },
    titleClick () {
      this.$parent.titleClick()
    }
  }
}
</script>

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
