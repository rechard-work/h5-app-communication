<template>
  <div class='pages'>
    <headernav ref="headerNav" :title="title"></headernav>
    <van-swipe ref="myswiper" class="my-swipe" :loop='false' :initial-swipe='current' @change="onChange">
      <van-swipe-item class="flex">
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
      </van-swipe-item>
      <van-swipe-item>2</van-swipe-item>
      <van-swipe-item>3</van-swipe-item>
      <van-swipe-item>4</van-swipe-item>
      <template #indicator>
        <van-tabs class="nav border-bottom-1px" v-model="current">
          <van-tab :title="'标题'+(current+1)"></van-tab>
        </van-tabs>
        <!-- <div class="nav border-bottom-1px">
          <ul class="list" @click="tabItem">
            <li v-for="(item, index) in 4"
              :key="item"
              :class="{ active : current == index }"
              :data-index='index'
            >{{index+1}}</li>
          </ul>
        </div> -->
      </template>
    </van-swipe>
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
      pageIndex: 1
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
          interactive: true
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
        this.pageIndex = 1
        this.moreTxt = '加载更多'
        setTimeout(() => {
          this.arr = new Array(this.pageIndex * 10)
          this.$nextTick(() => {
            this.scroll.refresh() // DOM 结构发生变化后，重新初始化BScroll
          })
          this.scroll.finishPullDown() // 下拉刷新动作完成后调用此方法告诉BScroll完成一次下拉动作
        }, 300)
      })
      this.scroll.on('pullingUp', () => {
        if (this.pageIndex > 6) {
          this.moreTxt = '没有更多数据了'
          return
        }
        setTimeout(() => {
          this.pageIndex++
          this.arr = new Array(this.pageIndex * 10)
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
    tabItem (e) {
      let target = e.target || e.srcElemment
      if (target.nodeName.toLowerCase() === 'li') {
        this.current = target.innerHTML - 1
      }
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
  height: 100%;
  /deep/.van-swipe__indicators{
    top: 0;
    bottom: auto;
    .van-swipe__indicator{
      background: #000;
    }
  }
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
      flex: 1;
      height: 100%;
      line-height: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      border-right: 1px solid #dedede;
      margin: 0 !important;
      &.active{
        background: #7cb7f4;
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
