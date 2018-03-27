<template>
<div>
<el-row>
  <span>总收入：{{staProfit}}</span>
</el-row>
  <el-row >
    <div id="soldRateChart" ></div>
  </el-row>
  <el-row>
    <div id="upSeatRateChart" ></div>
  </el-row>
  <el-row>
  </el-row>
</div>
</template>

<script>
import ElRow from "element-ui/packages/row/src/row";
import {option} from '../../echarts/SoldRateecharts'
import {option1} from '../../echarts/UpSeatRateChart'

export default {
  components: {
    ElRow},
  name: "sta-finance",
  data(){
  return{
    staProfit:'',
  }
  },
  created() {
    this.fetchData();
  },
  mounted(){
    this.drawSoldRateChart();
    this.drawUpSeatChart();
  },
  methods:{
    drawSoldRateChart() {
      // 基于准备好的dom，初始化echarts实例
      let soldRateChart=this.$echarts.init(document.getElementById("soldRateChart"));
      // 绘制基本图表
      soldRateChart.setOption(option);

      //获取数据
      let self=this;
      var url='stadium/getSoldRate';
      var xdata=[];
      var ydata=[];
      var params=new URLSearchParams();

      params.append("staId",self.$route.params.id);
 self.$axios({
        method:'post',
        url:url,
        data:params,
      }).then(function (resp1) {
        for(var i=0;i<resp1.data.length;i++){
          xdata.push(resp1.data[i].showId);
          ydata.push(resp1.data[i].rate);
        };
   soldRateChart.hideLoading();
   soldRateChart.setOption({
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


    drawUpSeatChart(){
      // 基于准备好的dom，初始化echarts实例
      let upSeatRateChart=this.$echarts.init(document.getElementById("upSeatRateChart"));
      upSeatRateChart.setOption(option1);
      let self=this;
      var url='stadium/getUpSeatRate';
      var params=new URLSearchParams();
      var xdata=[];
      var ydata=[];
      params.append("staId",self.$route.params.id);
      self.$axios({
        method:'post',
        url:url,
        data:params,
      }).then(function (resp1) {
        for(var i=0;i<resp1.data.length;i++){
          xdata.push(resp1.data[i].showId);
          ydata.push(resp1.data[i].rate);
        };
        upSeatRateChart.hideLoading();
        upSeatRateChart.setOption({
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

  fetchData(){
    let self=this;
    var params=new URLSearchParams();
    var url='stadium/getProfit';
    params.append("id",self.$route.params.id);
    self.$axios({
      method:'post',
      url:url,
      data:params,
    }).then(function (response) {
      self.staProfit=response.data.profit+"元";
    }).catch(function (error) {
      console.log(error);
    });
  },
  }
}
</script>

<style scoped>
#soldRateChart, #upSeatRateChart{
  margin-left: 15%;
  margin-top: 40px;
  width: 900px;
  height: 400px;
  background-color: white;
  box-shadow: 2px 2px 3px #BFBFBF;
}
</style>
