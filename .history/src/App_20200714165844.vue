<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <transition>
      <router-view/>
    </transition>
    <van-tabbar route>
    <van-tabbar-item replace to="/index" icon="home-o">
      首页
    </van-tabbar-item>
    <van-tabbar-item replace to="/search" icon="search">
      标签
    </van-tabbar-item>
  </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang='less'>
html,body{
  height: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  overflow: hidden;
  .pages{
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
  }
}
</style>
