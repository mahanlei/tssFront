<template>
  <el-container>
    <el-header  >
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
    <el-main v-loading.fullscreen.lock="loading">
      <el-carousel :interval="4000" type="card" height="250px">
        <el-carousel-item v-for="(item, index) in ImageList" :key="item" >
          <img :src="item.src" height="250px" width="460px"/>
        </el-carousel-item>
      </el-carousel>
      <div v-for="(card,index) in cards ":key="card" v-bind:showId="card.showId" ref="cardItem" style="margin-left: 20px">
        <div id="showBrief">
          <img :src="card.picture" height="220px" width=100% />
          <div style="padding: 14px;">
            <span style="font-size: 18px">{{card.name}}</span>
            <div class="bottom clearfix">
              <p class="time" style="color:rgb(215,196,187)">类型：{{ card.type }}</p>
              <el-button type="text" class="button"  @click="viewDetail(index)">查看详情</el-button>
            </div>
          </div>
        </div>
      </div>
    </el-main>
  </el-container>

</template>

<script>
import ElMain from "element-ui/packages/main/src/main";
import ElFooter from "element-ui/packages/footer/src/main";
import showCard from "../components/showCard"
export default {
  data(){
    return{
      myCenter:'',
      ImageList: [
        {index: 1, src: 'https://images.unsplash.com/39/lIZrwvbeRuuzqOoWJUEn_Photoaday_CSD%20(1%20of%201)-5.jpg?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=92b4ef70a4e06a7e7bf54e1bde61b624&auto=format&fit=crop&w=1950&q=80'},
        {index: 2, src: 'https://images.unsplash.com/photo-1485095329183-d0797cdc5676?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=2405fa5a688f4c925fa1b8f6959174f8&auto=format&fit=crop&w=1350&q=80'},
        {index: 3, src: 'https://images.unsplash.com/photo-1455472467710-3b204ed59394?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c6750da6c358b00bd8b70f00946ecb13&auto=format&fit=crop&w=1350&q=80'},
        {index:4,src:'https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=40aeba3c68446f98649f5bf962faf5f0&auto=format&fit=crop&w=1340&q=80'},
        {index:5,src:'https://images.unsplash.com/photo-1486693128850-a77436e7ba3c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=a9aedea7c1df286a4bd96f37e7cc8f10&auto=format&fit=crop&w=1350&q=80'}

      ],
      cards:[ ],
   loading:false,
      cardItem:{

      }
    }
  },
  components: {
showCard,
    ElMain,
    ElFooter
  },
  name: "home-page",
  created(){
    this.fetchData();
  },
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
      self.myCenter = routerParams;
    },
  watch: {
    // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
    '$route': 'getParams'
  },
handleCommand(command){
      let self=this;
      switch (command){
        case "myOrder":
        case "points":
        case "discountCoupon":
        case "profile":
          this.$router.push({
            name:"profile",
            params:{
              mid:self.$route.params.id
            }
          })

        case "setting":
break;
      }
},
fetchData(){
  let self=this;
  self.loading = true;
  var url = 'show/showList';
  self.$axios({
    method:'post',
    url:url,
    data:'',
  }).then(function (response) {
    console.log(response.data);
    for(var i=0;i<response.data.length;i++)
    {
      self.cards.push(response.data[i]);
    }
    self.loading=false;
  }).catch(function (error) {
    console.log(error);
  });
},
viewDetail(index){
let self=this;
  var url = 'show/showInfo';
  var params = new URLSearchParams();
  var showId=self.cards[index].showId
  console.log(self.cards[index].showId);
  params.append("showId",showId);
  self.$axios({
    method:'post',
    url:url,
    data:params,
  }).then(function (response) {
    console.log(response.data);

  }).catch(function (error) {
    console.log(error);
  });
}
}
}
</script>

<style scoped>
  @import "../assets/css/HomePage.css";
</style>
