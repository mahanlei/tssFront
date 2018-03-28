<template>
  <el-row >
    <div id="stadiumShowsChart" ></div>
  </el-row>
</template>

<script>
  import {option} from "../../echarts/stadiumShowsChart";

  export default {
    name: "man-stadium",
    mounted() {
      this.drawStadiumShowsChart();
    },
    methods: {
      drawStadiumShowsChart() {
        let stadiumShowsChart = this.$echarts.init(document.getElementById("stadiumShowsChart"));
        // 绘制基本图表
        stadiumShowsChart.setOption(option);

        //获取数据
        let self = this;
        var url = '/countStaShows';
        var xdata = [];
        var ydata = [];
        var params = new URLSearchParams();
        self.$axios({
          method: 'post',
          url: url,
          data: params,
        }).then(function (resp1) {
          for (var i = 0; i < resp1.data.length; i++) {
            xdata.push(resp1.data[i].staId);
            ydata.push(resp1.data[i].number);
          }
          ;
          stadiumShowsChart.hideLoading();
          stadiumShowsChart.setOption({
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
        stadiumShowsChart.on('click', function (params) {
          var id=self.zfill(params.name,7);
          self.$router.push({
            name:'staShows',
            params:{
              id:id,
            }
          })

         console.log(params.name);
        });
      },
     zfill(num, size) {
    var s = "000000000" + num;
    return s.substr(s.length-size);
  },

  }

}
</script>

<style scoped>
  #stadiumShowsChart{
    margin-left: 15%;
    margin-top: 40px;
    width: 900px;
    height: 400px;
    background-color: white;
    box-shadow: 2px 2px 3px #BFBFBF;}
</style>
