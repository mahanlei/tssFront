<template>
  <el-container>
    <el-header style="padding-left: 0">
      <el-row >
        <el-col :span="16"><div class="grid-content ">
          <h2>TSS经理</h2>
        </div></el-col>
      </el-row>
    </el-header>
    <el-container style="margin-top: 3px">
      <el-aside width="160px" >
        <el-menu
          :default-active="activeIndex"
          class="el-menu-vertical-demo"
          @select="handleSelect"
          background-color=rgb(34,31,31)
          text-color="#fff">
          <el-menu-item index="1">
            <span slot="title">审批申请</span>
          </el-menu-item>
          <el-menu-item index="2" >
            <span slot="title">票单统计</span>
          </el-menu-item>
          <el-menu-item index="3">
            <span slot="title">场馆统计</span>
          </el-menu-item>
          <el-menu-item index="4">
            <span slot="title">会员统计</span>
          </el-menu-item>
        </el-menu>
      </el-aside >
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
name: "man-home",
  data(){
  return{
    activeIndex:'1',
  }
  },
  methods:{
    handleSelect(key){
      let self=this;
      console.log(key);
      self.activeIndex=key;
      switch (key){
        case '1':
          self.$router.push({
            name:'manApproval',
          })
          break;
        case '2':
          self.$router.push({
            name:'manTicket',

          });
          break;
        case '3':
          self.$router.push({
            name:'manStadium',

          })
          break;
        case '4':
          self.$router.push({
            name:'manMember',
          })
          break;
      }
    },
  }
}
</script>

<style scoped>
  @import "../../assets/css/stadium/StaHomePage.css";
  .el-aside{
    text-align: center;
  }

</style>
