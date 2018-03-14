<template>
  <el-row class="rowPanel">
    <p>我的当前积分：{{discountInfo.points}}</p>
    <el-row>
      <span class="count">95%折扣优惠券：{{discountInfo.count1}}张</span>
      <span class="count">90%折扣优惠券：{{discountInfo.count2}}张</span>
      <span class="count">80%折扣优惠券：{{discountInfo.count3}}张</span>
      <span class="count">75%折扣优惠券：{{discountInfo.count4}}张</span>
    </el-row>
    <el-radio-group v-model="discountInfo.radio" @input="selectDiscountType">
      <el-radio :label="2">满200分可兑换的95%折扣优惠券</el-radio>
      <el-radio :label="3">满300分可兑换的90%折扣优惠券</el-radio>
      <el-radio :label="4">满400分可兑换的80%折扣优惠券</el-radio>
      <el-radio :label="5">满500分可兑换的75%折扣优惠券</el-radio>
    </el-radio-group>
    <!--<el-row>-->
      <!--<el-button id="exchangeBt" @click="doExchange">兑换</el-button>-->
    <!--</el-row>-->
  </el-row>

</template>

<script>
export default {
name: "pay",
  data() {
    return {
      discountInfo: {
        points: '',
        count1: '',
        count2: '',
        count3: '',
        count4: '',
        radio: 2,
      },
      loading: true,
    }
  },

  created() {
    this.fetchData();
  },
  vuex:{
    getters:{
      seats: function(state){
        return state.seats
      }
    }
  },
  methods:{

    selectDiscountType(data) {
      let self = this;
      self.radio = data;
      console.log(self.radio);
    },
  fetchData(){
      let self = this;
      self.loading = true;
      var url = 'discountCoupon'
      var params = new URLSearchParams();
      var mid = self.$route.params.mid;
      console.log(mid);
      console.log(self.state.seats());
      params.append("mid", mid)
      self.$axios({
        method: 'post',
        url: url,
        data: params,
      }).then(function ( response) {
          // console.log(resp1.data);
          console.log(response.data);
          // self.discountInfo.points = resp1.data.points;
          self.discountInfo.count1 = response.data.discountCouponType1;
          self.discountInfo.count2 = response.data.discountCouponType2;
          self.discountInfo.count3 = response.data.discountCouponType3;
          self.discountInfo.count4 = response.data.discountCouponType4;
          self.loading = false;

        }).catch(function (error) {
        console.log(error);

      });
    }
  },

}
</script>

<style scoped>
@import "../assets/css/Pay.css";
</style>
