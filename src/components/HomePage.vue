<template>
  <el-container>
    <el-header >
      <el-row :gutter="20">
        <el-col :span="16"><div class="grid-content ">
          <h1>TSS</h1>
        </div></el-col>
        <el-col :span="8"><div class="grid-content ">
          <p id="login" v-on:click="login">登录</p>
        </div></el-col>
      </el-row>
    </el-header>
    <el-main >
      <!--<el-carousel :interval="4000" type="card" height="200px">-->
        <!--<el-carousel-item >-->
         <!--<img :src ="src/assets/image/1.jpg" class="image" alt="">-->
        <!--</el-carousel-item>-->
        <!--<el-carousel-item >-->

        <!--</el-carousel-item>-->
        <!--<el-carousel-item >-->

        <!--</el-carousel-item>-->
        <!--<el-carousel-item >-->

        <!--</el-carousel-item>-->

      <!--</el-carousel>-->
    </el-main>
    <el-footer style="height: 150px" >

    </el-footer>

  </el-container>

</template>

<script>
import ElMain from "element-ui/packages/main/src/main";
import ElFooter from "element-ui/packages/footer/src/main";

export default {
  components: {
    ElFooter,
    ElMain},
  name: "home-page",
  methods: {
    login: function (event) {
this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
  @import "../assets/css/HomePage.css";
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  .image {
    width: 100%;
    height: 100%;
    display: block;
  }
  .el-carousel__item:nth-child(0) {
    /*background-color: #99a9bf;*/
  }

  .el-carousel__item:nth-child(1) {
    /*background-color: #475669;*/
  }
  .el-carousel__item:nth-child(2) {
    /*background-color: #99a9bf;*/
  }
  .el-carousel__item:nth-child(3) {
    /*background-color: #475669;*/
  }


</style>
