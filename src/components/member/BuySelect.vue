<template>
  <el-container>
    <el-header>
      <h3>选座购买</h3>
    </el-header>
    <el-main>
      <div>
        <transition name="fade">
          <router-view></router-view>
        </transition>
      </div>
    </el-main>
  </el-container>
</template>

<script>
export default {
name: "buy-select",
}
</script>

<style scoped>
@import "../../assets/css/member/BuySelect.css";
</style>
