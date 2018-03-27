<template>
<div v-loading.fullscreen.lock="loading">
  <el-tabs v-model="activeName" @tab-click="handleClick(activeName)">
    <el-tab-pane label="预定" name="first">
      <div class="ticketInfoBrief" v-for="(unConsumedTicket,index) in unConsumedTickets ":key="unConsumedTicket" >
        <div>
          <el-row style="height: 180px">
            <el-col :span="8">
              <img :src="unConsumedTicket.picture" class="image" />
            </el-col>
            <el-col :span="12">
              <div style="padding: 14px;padding-left: 200px">
                <el-row class="infoDetail">
                  <span  style="font-size: 20px;color:rgb(247, 196, 66) ">{{unConsumedTicket.showName}}</span>
                </el-row>
                <el-row class="infoDetail">
                  <span style="">购买人：{{unConsumedTicket.mid}}</span>
                </el-row >
                <el-row class="infoDetail">
                  <span >{{unConsumedTicket.seatRow}}排{{unConsumedTicket.seatColumn}}座</span>
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
          </el-row>
        </div>

      </div>

    </el-tab-pane>
    <el-tab-pane label="退订" name="second">
      <div class="ticketInfoBrief" v-for="(UnsubscribeTicket,index) in UnsubscribeTickets ":key="UnsubscribeTicket">
        <div >
          <el-row style="height: 210px">
            <el-col :span="8">
              <img :src="UnsubscribeTicket.picture" class="image" style="height:190px;"/>
            </el-col>
            <el-col :span="12">
              <div style="padding: 14px;padding-left: 200px">
                <el-row class="infoDetail">
                  <span  style="font-size: 20px;color:rgb(247, 196, 66) ">{{UnsubscribeTicket.showName}}</span>
                </el-row>
                <el-row class="infoDetail">
                  <span style="">购买人：{{UnsubscribeTicket.mid}}</span>
                </el-row >
                <el-row class="infoDetail">
                  <span >{{UnsubscribeTicket.seatRow}}排{{UnsubscribeTicket.seatColumn}}座</span>
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
                <el-row >
                  <span style="font-size: 12px">订单编号：{{UnsubscribeTicket.tid}}</span>
                </el-row>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>

    </el-tab-pane>
  </el-tabs>
</div>
</template>

<script>
export default {
name: "sta-ticket-list",
  data(){
  return{
    activeName: 'first',
    unConsumedTickets:[],
    UnsubscribeTickets:[],
    loading:true,
  }
  },
  created() {
    this.fetchData();
  },
  methods:{
  fetchData(){
this.handleClick('first');
this.loading=false;
  },
    handleClick(activeName) {
      console.log(activeName);
      let self=this;
      var url='stadium/getStaTickets';
      var staId=self.$route.params.id;
      switch (activeName){
        case 'first':
          self.unConsumedTickets=[];
          var state='2';
          var params = new URLSearchParams();
          params.append("staId",staId);
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
                "mid":response.data[i].mid,
                "picture":response.data[i].picture,
                "showName":response.data[i].showName,
                "seatRow":response.data[i].seatRow,
                "seatColumn":response.data[i].seatColumn,
                "createdTime":response.data[i].createdTime,
                "payPrice":response.data[i].payPrice+"元",
                "tid":response.data[i].tid,
              };
              self.unConsumedTickets.push(obj);
            }

          }).catch(function (error) {
            console.log(error);
          });
          break;
        case 'second':
          self.UnsubscribeTickets=[];
          var state='3';
          var params = new URLSearchParams();
          params.append("staId",staId);
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
                "mid":response.data[i].mid,
                "picture":response.data[i].picture,
                "showName":response.data[i].showName,
                "staName":response.data[i].staName,
                "seatRow":response.data[i].seatRow,
                "seatColumn":response.data[i].seatColumn,
                "createdTime":response.data[i].createdTime,
                "payPrice":response.data[i].payPrice+"元",
                "refunedTime":response.data[i].refunedTime,
                "tid":response.data[i].tid,
              };
              self.UnsubscribeTickets.push(obj);
            }

          }).catch(function (error) {
            console.log(error);
          });
          break;
      }

  },

  }

}
</script>

<style scoped>
  .ticketInfoBrief{
    margin-left: 20px;
    margin-bottom: 20px;
    background-color: white;
    box-shadow: 2px 2px 3px #BFBFBF;
  }
  .image{
    height:160px;
    width:100%;
    margin-top: 10px;
    margin-left: 10px;
  }
  .infoDetail {
    text-align: center;
    /*margin-left: 10%;*/
    font-size: 15px;
    margin-top: 6px;
  }
</style>
