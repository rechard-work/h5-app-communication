<template>
    <div class="search">
      <input v-model="value">
      <van-button type="primary" size="mini">跳转小程序</van-button>
    </div>
</template>

<script>
export default {
  data () {
    return {
      value: ''
    }
  }
}
</script>

<style scoped lang='less'>
.search{
  font-size: 14px;
}
</style>
