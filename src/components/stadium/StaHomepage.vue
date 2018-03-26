<template>
  <el-container>
    <el-header >
      <el-row :gutter="5">
        <el-col :span="18"><div class="grid-content ">
          <h2>TSS场馆</h2>
        </div></el-col>
        <el-col :span="6" >
          <div class="grid-content " style="font-size: 30px;    margin-top: 6px;">
              <p id="staId" >{{staId}}</p>
          </div>
        </el-col>
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
      <span slot="title">已有演出</span>
    </el-menu-item>
    <el-menu-item index="3" >
      <span slot="title">检票</span>
    </el-menu-item>
    <el-menu-item index="4">
      <span slot="title">发布演出</span>
    </el-menu-item>
    <el-menu-item index="5">
      <span slot="title">查看/修改信息</span>
    </el-menu-item>
    <el-menu-item index="6">
      <span slot="title">财务数据</span>
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
import ElContainer from "element-ui/packages/container/src/main";
import ElAside from "element-ui/packages/aside/src/main";

export default {
  components: {
    ElAside,
    ElContainer},
  name: "home-page",
  data(){
  return{
staId:'',
    activeIndex:'1',
  }
  },
  created(){
    this.fetchData();
  },
  methods:{
    fetchData(){
      let self=this;
     self.staId=self.$route.params.id;
    },
    handleSelect(key){
      let self=this;
      console.log(key);
      self.activeIndex=key;
switch (key){
  case '1':
    self.$router.push({
      name:'existingShow',
      params:{
        id:self.$route.params.id
      }
    })
        break;
  case '3':
    self.$router.push({
      name:'checkTickets',
      params:{
        id:self.$route.params.id
      }
    });
    break;
  case '4':
    self.$router.push({
      name:'publishShow',
      params:{
        id:self.$route.params.id
      }
    })
    break;
  case '5':
    self.$router.push({
      name:'staFinance',
      params:{
        id:self.$route.params.id
      }
    })
    break;
}
    },

  }
}
</script>

<style scoped>
@import "../../assets/css/stadium/StaHomePage.css";
</style>
