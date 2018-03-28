<template>
  <div>
    <el-row>
      <span>总收入：{{profit}}</span>
    </el-row>
    <el-row >
      <div id="ticketCountChart" ></div>
    </el-row>
    <el-row>
      <div id="ticketPriceChart" ></div>
    </el-row>
    <el-row>
    </el-row>
  </div>
</template>

<script>
  import {option} from '../../echarts/TicketCountChart'
  import {option1} from '../../echarts/TicketPriceChart'
export default {

name: "man-ticket",
  data(){
  return{
    profit:'',
  }
  },
  created() {
    this.fetchData();
  },
  mounted(){
    this.drawTicketCountChart();
    this.drawTicketPriceChart();
  },
  methods:{
    drawTicketCountChart(){
      let ticketCountChart=this.$echarts.init(document.getElementById("ticketCountChart"));
      // 绘制基本图表
      ticketCountChart.setOption(option);

      //获取数据
      let self=this;
      var url='/getTicketCount';
      var xdata=[];
      var ydata=[];
      var params=new URLSearchParams();

      self.$axios({
        method:'post',
        url:url,
        data:params,
      }).then(function (resp1) {
        for(var i=0;i<resp1.data.length;i++){
          xdata.push(resp1.data[i].time);
          ydata.push(resp1.data[i].number);
        };
        ticketCountChart.hideLoading();
        ticketCountChart.setOption({
          xAxis: {
            data: xdata  //将异步请求获取到的数据进行装载
          },
          series: [{
            data: ydata
          }]
        })
      }).catch(function (error) {
        console.log(error);
      });

    },
    drawTicketPriceChart() {
      let ticketPriceChart=this.$echarts.init(document.getElementById("ticketPriceChart"));
      // 绘制基本图表
      ticketPriceChart.setOption(option1);

      //获取数据
      let self=this;
      var url='/getTicketPrice';
      var xdata=[];
      var ydata=[];
      var params=new URLSearchParams();
      self.$axios({
        method:'post',
        url:url,
        data:params,
      }).then(function (resp1) {
        for(var i=0;i<resp1.data.length;i++){
          xdata.push(resp1.data[i].time);
          ydata.push(resp1.data[i].price);
        };
        ticketPriceChart.hideLoading();
        ticketPriceChart.setOption({
          xAxis: {
            data: xdata  //将异步请求获取到的数据进行装载
          },
          series: [{
            data: ydata
          }]
        })
      }).catch(function (error) {
        console.log(error);
      });

    } ,
    fetchData(){
      let self=this;
      var params=new URLSearchParams();
      var url='stadium/getProfit';
      var id="0000000";
      params.append("id",id);
      self.$axios({
        method:'post',
        url:url,
        data:params,
      }).then(function (response) {
        self.profit=response.data.profit+"元";
      }).catch(function (error) {
        console.log(error);
      });
    },
  }
}
</script>

<style scoped>
#ticketCountChart,#ticketPriceChart{
margin-left: 15%;
  margin-top: 40px;
  width: 900px;
  height: 400px;
  background-color: white;
  box-shadow: 2px 2px 3px #BFBFBF;}
</style>
