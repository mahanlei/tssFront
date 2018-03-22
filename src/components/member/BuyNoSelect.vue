<template>
  <el-container>
    <el-header>
      <h3>不选座购买</h3>
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
name: "buy-no-select"
}
</script>

<style scoped>

  .el-header{
    background-color: rgb(102, 186, 183);
  }
  .header.el-header{
    padding: 0px;
    height: 55px;

  }
  .el-header el-row{
    height: 55px;

  }
  .el-header h3{
    font-weight: inherit;
    font-size: 20px;
    color: white;
    text-align: center;
    margin-top: 16px;
  }
  .el-main{
    background-color: rgb(245,245,245);
    padding: 50px;
    height: 800px;
  }

</style>
