<template>
  <el-container>
    <el-header>
      <h3>选座购买</h3>
    </el-header>
    <el-main>
      <div>
        <el-steps :active="step"  finish-status="success" align-center>
          <el-step title="选座" ></el-step>
          <el-step title="支付" ></el-step>
          <el-step title="完成" ></el-step>
        </el-steps>
        <!--<el-row class="rowPanel1">-->
          <!--<p style="  margin-top: 10px;" >演出：{{showName}}</p>-->
          <!--<p>场馆：{{staName}}</p>-->
          <!--<p>共{{seatRows}}排{{seatColumns}}列</p>-->
        <!--</el-row>-->
        <transition name="fade">
          <router-view></router-view>
        </transition>
        <el-button style="margin-top: 30px" v-show="nextStep" @click.native.prevent="handleNext">下一步</el-button>
        <el-button style="margin-top: 30px"  @click.native.prevent="handleComplete" v-show="complete" type="primary">发布活动</el-button>
      </div>
    </el-main>
  </el-container>
</template>

<script>
  import  store from '../assets/js/Store'
export default {

name: "buy-select",
  data(){
    return{
      step:1,
      nextStep: false,
      complete:false,

    }
  },
  store:store,
  // vuex:{
  //   actions:{
  //     update:function({dispatch},value) {
  //       dispatch('UPDATE',value)
  //     }
  //   }
  // },
  methods:{
    handleNext(){
      let self=this;
      var mid=self.$route.params.mid;
      var stadiumId=self.$route.params.stadiumId;
      var showId=self.$route.params.showId;
      console.log(mid);
      console.log(showId);
      self.$router.push({
        name:'step'+(self.step+1),
        params:{
          mid:mid,
          stadiumId:stadiumId,
          showId:showId,
        }
      });
      setTimeout(function () {
          self.step++;
          self.goStep(self.step);
      })

    },
    handleComplete(){

    },
    goStep: function (n) {
      switch (n) {
        case 1 :
         this.nextStep = false;this.complete = false;
          break;
        case 2 :
          this.nextStep = true;this.complete = false;
          break;
        case 3 :
        this.nextStep = true;this.complete = true;
          break;

      }
    },

  }

}
</script>

<style scoped>
@import "../assets/css/BuySelect.css";
</style>
