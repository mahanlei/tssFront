<template>
  <div>
  <div class="existingShow" v-for="(showInfo,index) in shows " :key="showInfo" >
    <div>
      <el-row style="height: 240px">
        <el-col :span="8">
          <img :src="showInfo.picture" class="image" />

        </el-col>
        <el-col :span="12">
          <div style="padding: 14px;">

            <el-row class="infoDetail">
              <span  style="font-size: 20px">{{showInfo.showName}}</span>
            </el-row>
            <el-row class="infoDetail">
              <span style="color: rgb(104,104,104)">开始时间：{{showInfo.startTime}}</span>
            </el-row >
            <el-row class="infoDetail">
              <span style="color: rgb(104,104,104)">结束时间：{{showInfo.endTime}}</span>
            </el-row>
            <el-row class="infoDetail">
              <span style="color: rgb(104,104,104)">ID:{{showInfo.showId}}</span>  <span style="color: rgb(104,104,104)">类型：{{showInfo.type}}</span>
            </el-row>
            <el-row class="infoDetail" style="margin-top: 16px">
              <span style="font-size: 12px">描述：{{showInfo.description}}</span>
            </el-row>
          </div>
        </el-col>
        <el-col :span="3">
          <el-button id="buyBt1" v-show="showState" @click="buyTicket1(showInfo.showId)">购票</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: "existing-show",
  data() {
return{
  shows:[],
  showState:false,
}
  },
  created(){
    this.fetchData();
  },
  methods:{
    fetchData(){
      let self=this;
      self.shows=[];
      var url='/stadium/getExistShow';
      var staId=self.$route.params.id;
      var params = new URLSearchParams();
      params.append("staId",staId);
      self.$axios({
        method: 'post',
        url: url,
        data: params,
      }).then(function (response) {
        console.log(response.data);
        for(var i=0;i<response.data.length;i++){
          var showState='';
          if(response.data[i].showState==0){
            self.showState=true}
          var obj={
            "showId":response.data[i].showId,
            "picture":response.data[i].picture,
            "showName":response.data[i].showName,
            "startTime":response.data[i].startTime,
            "endTime":response.data[i].endTime,
            "type":response.data[i].type,
            "description":response.data[i].description,
            "showState":showState,
          };
          self.shows.push(obj);
        }

      }).catch(function (error) {
        console.log(error);
      });
    },
    buyTicket1(key){
      let self=this;
      // console.log(key);

      var staId=self.$route.params.id;
      var params = new URLSearchParams();
      var showId=key;
      params.append("staId",staId);
      params.append("showId",showId);
self.$router.push({
  name:'offlineTicket',
  params:{
    id:staId,
    showId:showId,
  }
})

    }
  }
}
</script>

<style scoped>
@import "../../assets/css/stadium/ExistingShow.css";
</style>
