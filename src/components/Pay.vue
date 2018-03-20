<template>
  <div>
    <el-row>
      <el-steps :active=2 finish-status="success" align-center>
        <el-step title="选座"></el-step>
        <el-step title="支付"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
    </el-row>
    <el-row class="rowPanel" v-loading.fullscreen.lock="loading">
      <p>{{createdTime}}</p>
      <div id="countDown">{{ ` ${min}分钟 ${sec}秒` }}</div>
      <el-alert title="" type="warning" description="一次性只能使用一张优惠券" close-text="我知道了" center>
      </el-alert>
      <el-row style="margin-top: 20px">
        <span class="count">95%折扣优惠券：{{discountInfo.count1}}张</span>
        <span class="count">90%折扣优惠券：{{discountInfo.count2}}张</span>
        <span class="count">80%折扣优惠券：{{discountInfo.count3}}张</span>
        <span class="count">75%折扣优惠券：{{discountInfo.count4}}张</span>
      </el-row>
      <el-radio-group v-model="discountInfo.radio" @input="selectDiscountType">
        <el-radio :label="2" :disabled="disabled1">95%折扣优惠券</el-radio>
        <el-radio :label="3" :disabled="disabled2">90%折扣优惠券</el-radio>
        <el-radio :label="4" :disabled="disabled3">80%折扣优惠券</el-radio>
        <el-radio :label="5" :disabled="disabled4">75%折扣优惠券</el-radio>
      </el-radio-group>
      <el-row>
        <el-tag
          v-for="tag in seats"
          :key="tag.name"
          :disable-transitions="false">
          {{tag.name}}
        </el-tag>
        <p>{{totalPayPrice1}}</p>
      </el-row>
      <el-row style="margin-top: 60px">
        <el-button style="background-color: rgb(102, 186, 183);
  color: white;
  border: 0px;
  width: 100px;" @click="doPay">确认支付
        </el-button>
      </el-row>

    </el-row>
  </div>
</template>

<script>
  export default {
    name: "pay",
    data() {
      return {
        discountInfo: {
          count1: '',
          count2: '',
          count3: '',
          count4: '',
          radio: '',
        },
        loading: true,
        seats: [],
        disabled1: false,
        disabled2: false,
        disabled3: false,
        disabled4: false,
        totalPayPrice1: '',
        totalPayPrice:'',
        min: 0,
        sec: 0,
        createdTime: '',
      }
    },
    mounted: function () {
      this.countdown()
    },
    created() {
      this.fetchData();
    },
    methods: {

      countdown: function () {
        let self = this;
        const end = Date.parse(new Date(self.createdTime));
        const now = Date.parse(new Date());//当前时间
        const msec = end + 1000 * 60 * 15 - now;
        let min = parseInt(msec / 1000 / 60);
        let sec = parseInt(msec / 1000 % 60);

        var mid = self.$route.params.mid;
        var showId = self.$route.params.showId;
        var stadiumId = self.$route.params.stadiumId;
        var params = new URLSearchParams();
        params.append("mid", mid);
        params.append("showId", showId);
        params.append("stadiumId", stadiumId);
        if (msec <= 0) {

          self.$message.error("付款超时，交易关闭");

          var url = 'buyTicket/closeDeal';
          self.$axios({
            method: 'post',
            url: url,
            data: params,
          }).then(function (response) {
            console.log(response.data.msg);
          });
          self.$router.push({
            name: 'dhome',
            params: {
              id: mid,
            }
          });
         vm.$destroy();
        } else {
          //监测票单状态，若为已支付1，则跳转到支付成功界面，若15分钟后仍是0，则跳转到支付失败界面，
          // 同时将票单状态置为交易关闭
          var url = 'buyTicket/checkTicketState';
          var params = new URLSearchParams();
          params.append("mid", mid);
          params.append("showId", showId);
          params.append("stadiumId", stadiumId);
          self.$axios({
            method: 'post',
            url: url,
            data: params,
          }).then(function (response) {
            console.log(response.data.msg);
            if (response.data.state == 1) {
              self.$router.push({
                name: 'step3',
                params:
                  {
                    mid: mid,
                    stadiumId: stadiumId,
                    showId: showId,
                  }
              })
              vm.$destroy();
            }
          });

        }
        self.min = min > 9 ? min : '0' + min;
        self.sec = sec > 9 ? sec : '0' + sec;
        // if(min>=15)
        setTimeout(function () {
          self.countdown()
        }, 1000)
      },

      selectDiscountType(data) {
        let self = this;
        self.radio = data;
        // console.log(self.radio);
        self.seats = [];
        var url = 'buyTicket/getPayPrice';

        var mid = self.$route.params.mid;
        var showId = self.$route.params.showId;
        var stadiumId = self.$route.params.stadiumId;
        var discountType = self.discountInfo.radio;
        var params = new URLSearchParams();
        params.append("mid", mid);
        params.append("showId", showId);
        params.append("stadiumId", stadiumId);
        params.append("discountType", discountType);

        self.$axios({
          method: 'post',
          url: url,
          data: params,
        }).then(function (response) {
          self.totalPayPrice1 = "共" + response.data.totalPayPrice + "元";
          self.totalPayPrice=response.data.totalPayPrice;
          for (var i = 0; i < response.data.seats.length; i++) {
            var obj = {
              "name": response.data.seats[i].seatRow + "排" + response.data.seats[i].seatColumn + "列",
              "row": response.data.seats[i].seatRow,
              "column": response.data.seats[i].seatColumn,
              "price": response.data.seats[i].price
            };
            self.seats.push(obj);
          }
        });
      },
      doPay() {

        let self=this;
        var url = 'buyTicket/doPay';
        var mid = self.$route.params.mid;
        var showId = self.$route.params.showId;
        var stadiumId = self.$route.params.stadiumId;
        var totalPayPrice = self.totalPayPrice;
        var params = new URLSearchParams();
        console.log(mid+","+showId+","+stadiumId+","+totalPayPrice);

        params.append("mid", mid);
        params.append("showId", showId);
        params.append("stadiumId", stadiumId);
        params.append("totalPayPrice", totalPayPrice);
        self.$axios({
          method: 'post',
          url: url,
          data: params,
        }).then(function (response) {
          console.log(response.data);
        }).catch(function (error) {
          console.log(error);
        });
      },

      fetchData() {
        let self = this;
        self.loading = true;
        var url = 'discountCoupon';
        var params = new URLSearchParams();
        var mid = self.$route.params.mid;
        var showId = self.$route.params.showId;
        var stadiumId = self.$route.params.stadiumId;
        var discountType=0;
        params.append("mid", mid);

        var url1 = 'buyTicket/getCreatedTime';
        var params1 = new URLSearchParams();
        var params2 = new URLSearchParams();
        console.log(stadiumId);
        params1.append("mid", mid);
        params1.append("showId", showId);
        params1.append("stadiumId", stadiumId);
        params2.append("mid", mid);
        params2.append("showId", showId);
        params2.append("stadiumId", stadiumId);
        params2.append("discountType", discountType);
        self.$axios.all([self.$axios({
          method: 'post',
          url: url,
          data: params,
        }), self.$axios({
          method: 'post',
          url: url1,
          data: params1,
        }),self.$axios({
          method:'post',
          url:'buyTicket/getPayPrice',
          data:params2
        })])
          .then(self.$axios.spread(function (resp1, resp2,response) {
            self.discountInfo.count1 = resp1.data.discountCouponType1;
            self.discountInfo.count2 = resp1.data.discountCouponType2;
            self.discountInfo.count3 = resp1.data.discountCouponType3;
            self.discountInfo.count4 = resp1.data.discountCouponType4;
            if (self.discountInfo.count1 == 0) {
              self.disabled1 = true;
            }
            if (self.discountInfo.count2 == 0) {
              self.disabled2 = true;
            }
            if (self.discountInfo.count3 == 0) {
              self.disabled3 = true;
            }
            if (self.discountInfo.count4 == 0) {
              self.disabled3 = true;
            }
            console.log(resp2.data);
            self.createdTime = resp2.data.createdTime;
            self.loading = false;
            self.totalPayPrice1 = "共" + response.data.totalPayPrice + "元";
            self.totalPayPrice=response.data.totalPayPrice;
            for (var i = 0; i < response.data.seats.length; i++) {
              var obj = {
                "name": response.data.seats[i].seatRow + "排" + response.data.seats[i].seatColumn + "列",
                "row": response.data.seats[i].seatRow,
                "column": response.data.seats[i].seatColumn,
                "price": response.data.seats[i].price
              };
              self.seats.push(obj);
            }
          })).catch(function (error) {
          console.log(error);

        });
      }
    },

  }
</script>

<style scoped>
  @import "../assets/css/Pay.css";
</style>
