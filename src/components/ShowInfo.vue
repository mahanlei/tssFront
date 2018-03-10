<template >
  <el-container>
    <el-header>
      <el-row :gutter="24">
        <el-col :span="19">
          <div class="grid-content ">
            <h3>演出详情</h3>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="grid-content ">
            <p id="login" v-on:click="dologin">{{$route.params.mid}}</p>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-main ref="showInfo">
      <!--演出信息第一排 -->
      <el-row  class="rowPanel" style="height: 400px ">
          <el-col :span="10">
        <div>
          <img :src="showInfo.picture" style="width:100%;height: 360px;
    margin-top: 20px;
    margin-left: 20px;"/>
        </div>
          </el-col>
          <el-col :span="14">
            <el-row  style="margin-top: 30px;">
              <span id="showName">{{showInfo.name}}</span>
            </el-row>
            <el-row class="infoDetail">
              <label>演出场馆：</label>
              <span>{{showInfo.staName}}</span>
            </el-row>
            <el-row class="infoDetail">
              <label>场馆规格：</label>
              <span>{{showInfo.seatRows}}排{{showInfo.seatColumns}}列</span>
            </el-row>
            <el-row class="infoDetail">
              <label>地址：</label>
              <span>{{showInfo.address}}</span>
            </el-row>
            <el-row class="infoDetail">
              <label>开始时间：</label>
              <span>{{showInfo.startTime}}</span>
            </el-row>
            <el-row class="infoDetail">
              <label>结束时间：</label>
              <span>{{showInfo.endTime}}</span>
            </el-row>
            <el-row >
              <el-button id="buyBt"  @click="buyTicket">购票</el-button>
            </el-row>
          </el-col>
        </el-row>
      <!--演出信息第二排 -->
      <el-row class="rowPanel" style="height: 200px">
        <h3 style="padding-left: 30px">演出简介</h3>
        <span style="float: left;margin-left: 100px">{{showInfo.description}}</span>
      </el-row>
      <!--温馨提示 -->
      <el-row class="rowPanel" style="height: 200px">
        <h3 style="padding-left: 30px;color: rgb(145,173,112)">温馨提示</h3>
        <span style="float: left;margin-left: 100px;color:rgb(215,196,187);text-align: left">{{showInfo.tip1}}</span>
        <span style="float: left;margin-left: 100px;color:rgb(215,196,187);text-align: left">{{showInfo.tip2}}</span>

      </el-row>
    </el-main>
  </el-container>
</template>

<script>
  import ElContainer from "element-ui/packages/container/src/main";
  import ElMain from "element-ui/packages/main/src/main";

  export default {
    components: {
      ElMain,
      ElContainer
    },
    name: "show-info",
    data() {
      return {

        showInfo: {
          picture: '',
          name: '',
          staName: '',
          seatRows: '',
          seatColumns: '',
          address: '',
          startTime: '',
          endTime: '',
          description: '',
          tip1: '1、购票下单成功后需在15分钟内完成支付，未支付成功的订单，将在下单15分钟后系统自动取消，所选价位将自动释放，大家可及时刷新购票页面进行购买。',
          tip2: '2、优惠券折扣与会员等级折扣可叠加使用',
        },
        login: '未登录',
      }
    },
    created(){
      this.fetchData();
    },
    methods:{
      fetchData(){
        let self=this;
        this.loading = true;
        var url = '/show/showInfo';
        var params=new URLSearchParams();
        var showId=self.$route.params.showId;
        if(self.$route.params.mid==0){
          self.$route.params.mid='未登录';
        }
        params.append('showId',showId);
        self.$axios({
          method:'post',
          url:url,
          data:params,
        }).then(function (response) {
          console.log(response.data);
          self.showInfo.picture=response.data.picture;
          self.showInfo.name=response.data.name;
          self.showInfo.staName=response.data.staName;
          self.showInfo.seatRows=response.data.seatRows;
          self.showInfo.seatColumns=response.data.seatColumns;
          self.showInfo.address=response.data.address;

          self.showInfo.startTime=response.data.startTime;
          self.showInfo.endTime=response.data.endTime;
          self.showInfo.description=response.data.description;
          self.loading=false;

        }).catch(function (error) {
          console.log(error);
        });
      },
      buyTicket: function(){

      },
dologin:function(){
        let self=this;
        if(self.$route.params.mid==0){
          self.$router.push('/login');
        }else {
          self.$message('您已登录');
        }

}
    }
  }
</script>

<style  >
@import "../assets/css/ShowInfo.css";
</style>
