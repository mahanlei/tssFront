<template>
  <el-container>
    <el-header >
      <el-row :gutter="20">
        <el-col :span="19"><div class="grid-content ">
          <h1>TSS</h1>
        </div></el-col>
        <el-col :span="3">
          <div class="grid-content ">
          <p id="login" v-on:click="dologin">登录|注册</p>
        </div>
        </el-col>
        <el-col :span="2" >
          <div class="grid-content " style="font-size: 30px">
            <el-dropdown @command="handleCommand">
                <p id="myCenter" >{{$route.params.id}}</p>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="myOrder">我的订单</el-dropdown-item>
                <el-dropdown-item command="points">我的积分</el-dropdown-item>
                <el-dropdown-item command="discountCoupon" >我的优惠券</el-dropdown-item>
                <el-dropdown-item command="profile" divided>个人资料</el-dropdown-item>
                <el-dropdown-item command="setting" >设置</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-col>
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
  data(){
    return{
      myCenter:'',
    }
  },
  components: {
    ElFooter,
    ElMain},
  name: "home-page",
  methods: {
    dologin: function (event) {
      this.$router.push('/login')
    },
    getParams () {
      let self=this;
      // 取到路由带过来的参数
      console.log(self.$route.params.id);
      let routerParams = self.$route.params.id;
      // 将数据放在当前组件的数据内
      self.myCenter = routerParams
    },
  watch: {
    // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
    '$route': 'getParams'
  },
handleCommand(command){
      switch (command){
        case "myOrder":
        case "points":
        case "discountCoupon":
        case "profile":
          this.$router.push('/login')
        case "setting":

      }
}
  }
}
</script>

<style scoped>
  @import "../assets/css/HomePage.css";
</style>
