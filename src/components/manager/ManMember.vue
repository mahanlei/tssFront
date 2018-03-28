<template>
  <div>
    <el-row>
      <span>总会员数：{{total}}</span>
    </el-row>
    <el-row >
      <div id="memberCountChart" ></div>
    </el-row>
  </div>
</template>

<script>
  import {option} from "../../echarts/MemberCountChart";

  export default {
name: "man-member",
    data(){
      return{
        total:'',
      }
    },
    created() {
      this.fetchData();
    },
    mounted(){
      this.drawMemberCountChart();
    },
    methods: {
      drawMemberCountChart() {
        let memberCountChart = this.$echarts.init(document.getElementById("memberCountChart"));
        // 绘制基本图表
        memberCountChart.setOption(option);

        //获取数据
        let self = this;
        var url = '/countMember';
        var ydata = [];
        var xdata=['0-20岁','20-30岁','30-40岁','40-50岁','>50岁'];
        var params = new URLSearchParams();

        self.$axios({
          method: 'post',
          url: url,
          data: params,
        }).then(function (response) {
          self.total=response.data.total;
          for (var i = 0; i < response.data.numbers.length; i++) {
            var obj={
              "value":response.data.numbers[i],
              "name":xdata[i],
            }
            ydata.push(obj);
          }
          ;
          memberCountChart.hideLoading();
          memberCountChart.setOption({
            series: [{
              data: ydata
            }]
          })
        }).catch(function (error) {
          console.log(error);
        });

      },
    }
}
</script>

<style scoped>
  #memberCountChart{
    margin-left: 15%;
    margin-top: 40px;
    width: 900px;
    height: 400px;
    background-color: white;
    box-shadow: 2px 2px 3px #BFBFBF;}
</style>
