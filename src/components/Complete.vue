<template>
  <div>
<p>支付成功</p>
  <router-link :to="{name: 'myOrder', params: {mid: this.$route.params.mid }}">查看我的订单</router-link>
    <router-link :to="{name:'dhome',params:{id: this.$route.params.mid}}">
    返回首页</router-link>
  </div>
</template>

<script>
export default {
name: "complete"
}
</script>

<style scoped>

</style>
