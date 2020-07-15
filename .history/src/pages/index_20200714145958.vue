<template>
  <div class='pages'>
    <headernav ref="headerNav" :title="title"></headernav>
    <van-swipe class="my-swipe" :loop='false' :initial-swipe='current' @change="onChange">
      <van-swipe-item>1</van-swipe-item>
      <van-swipe-item>2</van-swipe-item>
      <van-swipe-item>3</van-swipe-item>
      <van-swipe-item>4</van-swipe-item>
      <template #indicator>
        <div class="nav border-bottom-1px">
          <ul class="list">
            <li v-for="(item, index) in 4" :key="item" :class="{ active : current == index }">{{index+1}}</li>
          </ul>
        </div>
      </template>
    </van-swipe>
    <div class="flex wrapper" ref="wrapper">
      <div class="content">
        <h1>{{ msg }}</h1>
        <h2>Essential Links</h2>
        <ul>
          <li v-for="(item, index) in arr.length" :key='item'>ssd--{{index+1}}</li>
        </ul>
        <h2>{{moreTxt}}</h2>
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
      current: 0,
      scroll: null,
      moreTxt: '加载更多',
      arr: [],
      index: 1
    }
  },
  components: {
    headernav,
    vuefooter
  },
  mounted () {
    this.arr = new Array(10)
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true,
        scrollBar: {
          fade: true,
          interactive: false
        },
        pullDownRefresh: {
          threshold: 50,
          probeType: 3
        },
        pullUpLoad: {
          threshold: -20
        }
      })
      this.scroll.on('pullingDown', () => {
        this.index = 1
        this.moreTxt = '加载更多'
        this.arr = new Array(this.index * 10)
        this.$nextTick(() => {
          this.scroll.refresh() // DOM 结构发生变化后，重新初始化BScroll
        })
        this.scroll.finishPullDown() // 下拉刷新动作完成后调用此方法告诉BScroll完成一次下拉动作
      })
      this.scroll.on('pullingUp', () => {
        setTimeout(() => {
          if (this.index > 6) {
            this.moreTxt = '没有更多数据了'
            return
          }
          this.index++
          this.arr = new Array(this.index * 10)
          this.$nextTick(() => {
            this.scroll.refresh()
          })
          this.scroll.finishPullUp()
        }, 300)
      })
    })
    document.title = this.title
    this.appCall()
  },
  methods: {
    onChange (index) {
      this.current = index
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
.van-swipe{
  padding-top: 36px;
  /deep/.van-swipe__indicators{
    top: 0;
    bottom: auto;
    .van-swipe__indicator{
      background: #000;
    }
  }
}
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}
.nav{
  position: absolute;
  top: 0;
  height: 36px;
  width: 100%;
  overflow: hidden;
  .border-bottom-1px(#999);
  .list{
    display: flex;
    flex-direction: row;
    height: 100%;
    width: auto;
    overflow: auto;
    li{
      width: 40px;
      padding: 0 30px;
      height: 100%;
      line-height: 1;
      display: flex;
      align-items: center;
      border-right: 1px solid #dedede;
      margin: 0 !important;
      &.active{
        background: rgba(0,0,0,.3);
        color: #fff;
      }
    }
  }
}
h1,
h2 {
  font-weight: normal;
  font-size: 16Px;
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
