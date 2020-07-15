<template>
    <footer class="footer border-top-1px">
        <center>底部</center>
    </footer>
</template>

<script>
export default {
  data () {
    return {

    }
  }
}
</script>

<style lang="less" scoped>
@import '../common/css/mixin.less';
.footer{
  height: 36px;
  font-size: 16px;
  .border-top-1px(#dedede);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
