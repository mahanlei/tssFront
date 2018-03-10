<template>
  <el-container>
    <el-header>
      <el-row :gutter="24">
        <el-col :span="19">
          <div class="grid-content ">
            <h3>我的积分</h3>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="grid-content ">
            <p id="login">{{$route.params.mid}}</p>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-main ref="discountInfo" v-loading.fullscreen.lock="loading">
      <div>
        <el-alert title="兑换优惠券须知" type="warning" description="1、200积分可兑换95%折扣的优惠券；
        2、300积分可兑换90%折扣的优惠券；
        3、400积分可兑换80%折扣的优惠券；
        4、500积分可兑换75%折扣的优惠券
        请注意：不可同时使用多张优惠券" close-text="我知道了" center>
        </el-alert>
        <el-alert title="兑换优惠券须知" type="warning" description="
        请注意：不可同时使用多张优惠券"
                  close-text="我知道了" center>
        </el-alert>

      </div>
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
        <el-row>
          <el-button id="exchangeBt" @click="doExchange">兑换</el-button>
        </el-row>
      </el-row>

    </el-main>
  </el-container>
</template>

<script>
  import ElMain from "element-ui/packages/main/src/main";
  import ElContainer from "element-ui/packages/container/src/main";
  import ElRow from "element-ui/packages/row/src/row";

  export default {
    components: {
      ElRow,
      ElMain, ElContainer
    },
    name: "discount-coupon",
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
    methods: {
      selectDiscountType(data) {
        let self = this;
        self.radio = data;
        console.log(self.radio);
      },
      doExchange() {
        let self = this;
        var url = 'discountCoupon/exchange';
        var params = new URLSearchParams();
        var mid = self.$route.params.mid;
        var type1 = 0;
        var type2 = 0;
        var type3 = 0;
        var type4 = 0;
        switch (self.radio) {
          case 2:
            type1 = 1;
            break;
          case 3:
            type2 = 1;
            break;
          case 4:
            type3 = 1;
            break;
          case 5:
            type4 = 1;
            break;

        }
        params.append("mid", mid);
        params.append("discountCouponType1", type1);
        params.append("discountCouponType2", type2);
        params.append("discountCouponType3", type3);
        params.append("discountCouponType4", type4);
        self.$axios({
          method: 'post',
          url: url,
          data: params,
        }).then(function (response) {
          if(response.data.code==200) {
            self.$message.success(response.data.msg);
          }else self.$message.error(response.data.msg);
        }).catch(function (error) {
          console.log(error);

        });
      },
      fetchData() {
        let self = this;
        self.loading = true;
        var url1 = 'profile';
        var url2 = 'discountCoupon'
        var params = new URLSearchParams();
        var mid = self.$route.params.mid;
        console.log(mid);
        params.append("mid", mid)
        self.$axios.all([self.$axios({
          method: 'post',
          url: url1,
          data: params,
        }), self.$axios({
          method: 'post',
          url: url2,
          data: params,
        })])
          .then(self.$axios.spread(function (resp1, resp2) {
            console.log(resp1.data);
            console.log(resp2.data);
            self.discountInfo.points = resp1.data.points;
            self.discountInfo.count1 = resp2.data.discountCouponType1;
            self.discountInfo.count2 = resp2.data.discountCouponType2;
            self.discountInfo.count3 = resp2.data.discountCouponType3;
            self.discountInfo.count4 = resp2.data.discountCouponType4;
            self.loading = false;

          }));
      }
    }
  }
</script>

<style scoped>
  @import "../assets/css/DiscountCoupon.css";
</style>
