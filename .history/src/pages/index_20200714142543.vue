<template>
  <div class='pages'>
    <headernav ref="headerNav" :title="title"></headernav>
    <swiper class="swiper" ref="mySwiper" :options="swiperOption">
      <swiper-slide>Slide 1</swiper-slide>
      <swiper-slide>Slide 2</swiper-slide>
      <swiper-slide>Slide 3</swiper-slide>
      <swiper-slide>Slide 4</swiper-slide>
      <swiper-slide>Slide 5</swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <div class="nav border-bottom-1px">
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
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

export default {
  name: 'HelloWorld',
  data () {
    return {
      title: 'demo',
      realIndex: 0,
      swiperOption: {
        slidesPerView: 'auto',
        centeredSlides: true,
        initialSlide: 0,
        autoplay: {
          disableOnInteraction: false,
          delay: 2000
        },
        loop: true,
        // spaceBetween: 20,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        on: {
          slideChange: _ => {
            console.log(this.$refs.mySwiper.swiper)
            // this.realIndex = this.$refs.mySwiper.swiper.realIndex
          }
        }
      },
      msg: 'Welcome to Your Vue.js App',
      scroll: null,
      moreTxt: '加载更多',
      arr: [],
      index: 1
    }
  },
  components: {
    headernav,
    vuefooter,
    Swiper,
    SwiperSlide
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
.swiper{
  width: 100%;
  height: 150px;
}
.swiper-container {
  color: #000;
  /deep/.swiper-wrapper {
    // width: 347px;
    width: 100%;
    height: 150px;
    margin-top: 10px;

    .swiper-slide {
      // width: 100%;
      width: 347px;
      height: 100%;
      border: none;
      margin: 0 14px;
      transition: 300ms;
      img {
        width: 100%;
        height: 100%;
        border-radius: 10px;
      }
    }
  }
  .swiper-pagination-bullets {
    bottom: 12px;
    /deep/.swiper-pagination-bullet {
      width: 11px;
      height: 5px;
      background: rgba(224, 224, 224, 1);
      border-radius: 3px;
    }
    /deep/.swiper-pagination-bullet-active {
      width: 22px;
      background: linear-gradient(
        222deg,
        rgba(255, 220, 158, 1) 0%,
        rgba(217, 152, 59, 1) 100%
      );
    }
  }
}
.nav{
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
