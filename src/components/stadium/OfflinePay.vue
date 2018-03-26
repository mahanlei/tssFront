<template>
  <div style=" height: 240px;
  margin-left: 20px;
  padding-top: 10px;
  margin-top: 100px;
  background-color: white;
  box-shadow: 2px 2px 3px #BFBFBF" v-loading.fullscreen.lock="loading">
  <el-row style="margin-top: 40px">
    座位：<el-tag style="margin-left: 7px"
      v-for="tag in seats"
      :key="tag.name"
      :disable-transitions="false">
      {{tag.name}}
    </el-tag>
    <p style="margin-top: 30px">{{totalPayPrice1}}</p>
  </el-row>
  <el-row style="margin-top: 30px">
    <el-button @click="doUnPay">取消</el-button>
    <el-button type="primary" @click="doPay">确认支付</el-button>
  </el-row>
  </div>
</template>

<script>
export default {
  name: "offline-pay",
  data(){
    return{
      seats:[],
      totalPayPrice1:'',
      totalPayPrice:'',
      loading:true,
    }
  },
created(){
    this.fetchData();
},
  methods:{
    fetchData(){
      let self=this;
      // self.dialogVisible=true;
      var mid=self.$route.params.mid;
      var showId = self.$route.params.showId;
      var stadiumId = parseInt(self.$route.params.id);
      var url2 ='buyTicket/getPayPrice';
      var params2 = new URLSearchParams();
      var discountType=0;
      params2.append("mid", mid);
      params2.append("showId", showId);
      params2.append("stadiumId", stadiumId);
      params2.append("discountType", discountType);
      self.$axios({
        method:'post',
        url:url2,
        data:params2,
      }).then(function (response) {
        console.log(response.data.totalPayPrice);
        self.totalPayPrice1 = "共" + response.data.totalPayPrice + "元";
        self.totalPayPrice=response.data.totalPayPrice;
        for (var i = 0; i < response.data.seats.length; i++) {
          var obj = {
            "name": response.data.seats[i].seatRow + "排" + response.data.seats[i].seatColumn + "座",
            "row": response.data.seats[i].seatRow,
            "column": response.data.seats[i].seatColumn,
            "price": response.data.seats[i].price
          };
          self.seats.push(obj);

        }
        self.loading=false;
      }).catch(function (error) {
        console.log(error);
      });
    },
    doPay(){
      let self=this;
      var url = 'stadium/doPay';
      var params = new URLSearchParams();
      var mid=self.$route.params.mid;
      var showId = self.$route.params.showId;
      var stadiumId = parseInt(self.$route.params.id);
      params.append("mid",mid);
      params.append("showId",showId);
      params.append("stadiumId",stadiumId);
      self.$axios({
        method:'post',
        url:url,
        data:params,
      }).then(function (response) {
        console.log(response.data);
        if(response.data.code==200){
          self.$message.success("购买成功");
          self.dialogVisible=false;
        }else {
          self.$message.error("购买失败，请再次尝试");
        }
        self.$router.push({
          name:'existingShow',
          params:{
            id:self.$route.params.id
          }
        })
      })
    },
    doUnPay(){
      let self=this;
      var url = 'stadium/doUnPay';
      var params = new URLSearchParams();
      var mid=self.$route.params.mid;
      var showId = self.$route.params.showId;
      var stadiumId =parseInt(self.$route.params.id);
      params.append("mid",mid);
      params.append("showId",showId);
      params.append("stadiumId",stadiumId);
      self.$axios({
        method:'post',
        url:url,
        data:params,
      }).then(function (response) {
        if(response.data.code==200){
          self.$message.success("已取消此订单");
        }else {
          self.$message.error("请再次尝试");
        }
        self.$router.push({
          name:'existingShow',
          params:{
            id:self.$route.params.id
          }
        })

      })
    },
  }
}
</script>

<style scoped>

</style>
