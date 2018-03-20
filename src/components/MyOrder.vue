<template>
  <el-container>
    <el-header>
      <el-row :gutter="24">
        <el-col :span="19">
          <div class="grid-content ">
            <h3>我的订单</h3>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="grid-content ">
            <p id="login" >{{mid}}</p>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
  <el-tabs v-model="activeName" @tab-click="handleClick(activeName)">
    <el-tab-pane label="待付款" name="first">
      <div class="ticketInfoBrief" v-for="(unpaidTicket,index) in unpaidTickets ":key="unpaidTicket" >
      <div>
        <el-row style="height: 180px">
          <el-col :span="8">
            <img :src="unpaidTicket.picture" class="image" />
          </el-col>
          <el-col :span="12">
            <div style="padding: 14px;">
              <el-row class="infoDetail">
                <span  style="font-size: 20px;color:rgb(247, 196, 66) ">{{unpaidTicket.showName}}</span>
              </el-row>
              <el-row class="infoDetail">
                <span style="">地点：{{unpaidTicket.staName}}</span>
              </el-row >
              <el-row class="infoDetail">
                <span >{{unpaidTicket.seatRow}}排{{unpaidTicket.seatColumn}}列</span>
              </el-row>
              <el-row class="infoDetail">
                <span  >{{unpaidTicket.payPrice}}</span>
              </el-row>
              <el-row class="infoDetail" style="margin-top: 15px">
                <span style="font-size: 12px">购买时间：{{unpaidTicket.createdTime}}</span>
              </el-row>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    </el-tab-pane>
    <el-tab-pane label="待消费" name="second">
      <div class="ticketInfoBrief" v-for="(unConsumedTicket,index) in unConsumedTickets ":key="unConsumedTicket" >
        <div>
          <el-row style="height: 180px">
          <el-col :span="8">
          <img :src="unConsumedTicket.picture" class="image" />
          </el-col>
          <el-col :span="12">
          <div style="padding: 14px;">
            <el-row class="infoDetail">
            <span  style="font-size: 20px;color:rgb(247, 196, 66) ">{{unConsumedTicket.showName}}</span>
            </el-row>
            <el-row class="infoDetail">
            <span style="">地点：{{unConsumedTicket.staName}}</span>
            </el-row >
            <el-row class="infoDetail">
            <span >{{unConsumedTicket.seatRow}}排{{unConsumedTicket.seatColumn}}列</span>
            </el-row>
            <el-row class="infoDetail">
              <span  >{{unConsumedTicket.payPrice}}</span>
            </el-row>
            <el-row class="infoDetail" style="margin-top: 6px">
            <span style="font-size: 12px">购买时间：{{unConsumedTicket.createdTime}}</span>
            </el-row>
            <el-row >
              <span style="font-size: 12px">订单编号：{{unConsumedTicket.tid}}</span>
            </el-row>
          </div>
          </el-col>
            <el-col :span="4">
              <el-button id="refunedBt" @click="doRefuned(index)">退订</el-button>
            </el-col>
          </el-row>
        </div>

      </div>

    </el-tab-pane>
    <el-tab-pane label="已消费" name="third">
      <div class="ticketInfoBrief" v-for="(consumedTicket,index) in consumedTickets ":key="consumedTicket" >
        <div >
          <el-row style="height: 180px">
            <el-col :span="8">
              <img :src="consumedTicket.picture" class="image" />
            </el-col>
            <el-col :span="12">
              <div style="padding: 14px;">
                <el-row class="infoDetail">
                  <span  style="font-size: 20px;color:rgb(247, 196, 66) ">{{consumedTicket.showName}}</span>
                </el-row>
                <el-row class="infoDetail">
                  <span style="">地点：{{consumedTicket.staName}}</span>
                </el-row >
                <el-row class="infoDetail">
                  <span >{{consumedTicket.seatRow}}排{{consumedTicket.seatColumn}}列</span>
                </el-row>
                <el-row class="infoDetail">
                  <span  >{{consumedTicket.payPrice}}</span>
                </el-row>
                <el-row class="infoDetail" style="margin-top: 15px">
                  <span style="font-size: 12px">购买时间：{{consumedTicket.createdTime}}</span>
                </el-row>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-tab-pane>
    <el-tab-pane label="退订" name="fourth">
      <div class="ticketInfoBrief" v-for="(UnsubscribeTicket,index) in UnsubscribeTickets ":key="UnsubscribeTicket">
        <div >
          <el-row style="height: 180px">
            <el-col :span="8">
              <img :src="UnsubscribeTicket.picture" class="image" />
            </el-col>
            <el-col :span="12">
              <div style="padding: 14px;">
                <el-row class="infoDetail">
                  <span  style="font-size: 20px;color:rgb(247, 196, 66) ">{{UnsubscribeTicket.showName}}</span>
                </el-row>
                <el-row class="infoDetail">
                  <span style="">地点：{{UnsubscribeTicket.staName}}</span>
                </el-row >
                <el-row class="infoDetail">
                  <span >{{UnsubscribeTicket.seatRow}}排{{UnsubscribeTicket.seatColumn}}列</span>
                </el-row>
                <el-row class="infoDetail">
                  <span  >{{UnsubscribeTicket.payPrice}}</span>
                </el-row>
                <el-row class="infoDetail" style="margin-top: 5px">
                  <span style="font-size: 12px">购买时间：{{UnsubscribeTicket.createdTime}}</span>
                </el-row>
                <el-row >
                  <span style="font-size: 12px">退订时间：{{UnsubscribeTicket.refunedTime}}</span>
                </el-row>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>

    </el-tab-pane>
    <el-tab-pane label="支付失败" name="fifth">
      <div class="ticketInfoBrief" v-for="(payFailed,index) in payFaileds ":key="payFailed" style="margin-left: 20px">
        <div >
          <el-row style="height: 180px">
            <el-col :span="8">
              <img :src="payFailed.picture" class="image" />
            </el-col>
            <el-col :span="12">
              <div style="padding: 14px;">
                <el-row class="infoDetail">
                  <span  style="font-size: 20px;color:rgb(247, 196, 66) ">{{payFailed.showName}}</span>
                </el-row>
                <el-row class="infoDetail">
                  <span style="">地点：{{payFailed.staName}}</span>
                </el-row >
                <el-row class="infoDetail">
                  <span >{{payFailed.seatRow}}排{{payFailed.seatColumn}}列</span>
                </el-row>
                <el-row class="infoDetail">
                  <span  >{{payFailed.payPrice}}</span>
                </el-row>
                <el-row class="infoDetail" style="margin-top: 15px">
                  <span style="font-size: 12px">购买时间：{{payFailed.createdTime}}</span>
                </el-row>

              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-tab-pane>
  </el-tabs>
    </el-main>
  </el-container>
</template>

<script>
import ElContainer from "element-ui/packages/container/src/main";
import ElRow from "element-ui/packages/row/src/row";

export default {
  components: {
    ElRow,
    ElContainer},
  name: "my-order",
  data() {
    return {
      activeName: 'second',
      unpaidTickets:[],
      unConsumedTickets:[],
      UnsubscribeTickets:[],
      consumedTickets:[],
      payFaileds:[],

    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    handleClick(activeName) {
      console.log(activeName);
      let self=this;
      switch (activeName){
        case 'first':
          self.unpaidTickets=[];
          var url='/getOrderList';
          var mid=self.$route.params.mid;
          var state='0';
          var params = new URLSearchParams();
          params.append("mid",mid);
          params.append("state",state);
          console.log(state);
          self.$axios({
            method: 'post',
            url: url,
            data: params,
          }).then(function (response) {
            console.log(response.data);
            for(var i=0;i<response.data.length;i++){
              var obj={
                "picture":response.data[i].picture,
                "showName":response.data[i].showName,
                "staName":response.data[i].staName,
                "seatRow":response.data[i].seatRow,
                "seatColumn":response.data[i].seatColumn,
                "createdTime":response.data[i].createdTime,
                "payPrice":response.data[i].payPrice+"元"
              };
              self.unpaidTickets.push(obj);
            }
          }).catch(function (error) {
            console.log(error);
          });
          break;
        case 'second':
          self.unConsumedTickets=[];
          self.fetchData();
          break;
        case 'third':
          self.consumedTickets=[];
          var url='/getOrderList';
          var state='2';
          var mid=self.$route.params.mid;
          var params = new URLSearchParams();
          params.append("mid",mid);
          params.append("state",state);
          console.log(state);
          self.$axios({
            method: 'post',
            url: url,
            data: params,
          }).then(function (response) {
            console.log(response.data);
            for(var i=0;i<response.data.length;i++){
              var obj={
                "picture":response.data[i].picture,
                "showName":response.data[i].showName,
                "staName":response.data[i].staName,
                "seatRow":response.data[i].seatRow,
                "seatColumn":response.data[i].seatColumn,
                "createdTime":response.data[i].createdTime,
                "payPrice":response.data[i].payPrice+"元"
              };
              self.consumedTickets.push(obj);
            }

          }).catch(function (error) {
            console.log(error);
          });
          break;
        case 'fourth':
          self.UnsubscribeTickets=[];
          var url='/getOrderList';
          var state='3';
          var params = new URLSearchParams();
          var mid=self.$route.params.mid;
          params.append("mid",mid);
          params.append("state",state);
          console.log(state);
          self.$axios({
            method: 'post',
            url: url,
            data: params,
          }).then(function (response) {
            console.log(response.data);
            for(var i=0;i<response.data.length;i++){
              var obj={
                "picture":response.data[i].picture,
                "showName":response.data[i].showName,
                "staName":response.data[i].staName,
                "seatRow":response.data[i].seatRow,
                "seatColumn":response.data[i].seatColumn,
                "createdTime":response.data[i].createdTime,
                "payPrice":response.data[i].payPrice+"元",
                "refunedTime":response.data[i].refunedTime,
              };
              self.UnsubscribeTickets.push(obj);
            }

          }).catch(function (error) {
            console.log(error);
          });
          break;
        case 'fifth':
          self.payFaileds=[];
          var url='/getOrderList';
          var state='4';
          var mid=self.$route.params.mid;
          var params = new URLSearchParams();
          params.append("mid",mid);
          params.append("state",state);
          console.log(state);
          self.$axios({
            method: 'post',
            url: url,
            data: params,
          }).then(function (response) {
            console.log(response.data);
            for(var i=0;i<response.data.length;i++){
              var obj={
                "picture":response.data[i].picture,
                "showName":response.data[i].showName,
                "staName":response.data[i].staName,
                "seatRow":response.data[i].seatRow,
                "seatColumn":response.data[i].seatColumn,
                "createdTime":response.data[i].createdTime,
                "payPrice":response.data[i].payPrice+"元",
              };
              self.payFaileds.push(obj);
            }

          }).catch(function (error) {
            console.log(error);
          });
          break;

      }
    },
    doRefuned(index){
      let self=this;
      self.$confirm('此操作将退订此票单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var params = new URLSearchParams();
        var tid=this.unConsumedTickets[index].tid;
        params.append("tid",tid);
        self.$axios({
          method:'post',
          url:'doRefund',
          data:params,
        }).then(function (response) {
          console.log(response.data.msg);
          self.$message({
            type: 'success',
            message: '退订成功'
          });
        }).catch(function (error) {
          console.log(error);
        })
      }).catch(() => {
        self.$message({
          type: 'info',
          message: '已取消退订'
        });
      });
    },
    fetchData(){
      let self=this;
      var mid=self.$route.params.mid;
      self.mid=mid;
      var url='/getOrderList';
      var state='1';
      var params = new URLSearchParams();
      params.append("mid",mid);
      params.append("state",state);
      console.log(state);
      self.$axios({
        method: 'post',
        url: url,
        data: params,
      }).then(function (response) {
        console.log(response.data);
        for(var i=0;i<response.data.length;i++){
          var obj={
            "tid":response.data[i].tid,
            "picture":response.data[i].picture,
            "showName":response.data[i].showName,
          "staName":response.data[i].staName,
          "seatRow":response.data[i].seatRow,
            "seatColumn":response.data[i].seatColumn,
          "createdTime":response.data[i].createdTime,
          "payPrice":response.data[i].payPrice+"元"
          };
          self.unConsumedTickets.push(obj);
        }

      }).catch(function (error) {
        console.log(error);
      });
    },
  }
}
</script>

<style scoped>
@import "../assets/css/MyOrder.css";
</style>
