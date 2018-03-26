<template>
  <div class="check">
    <el-row>
      <el-row style="margin-left: 320px;margin-top: 30px">
        <el-input clearable autofocus v-model="mid" placeholder="用户名"></el-input>
       <el-input label="演出ID" type="number"   v-model="showId" placeholder="演出ID"></el-input>

      </el-row>
      <el-row style="margin-left: 320px">
        <el-input type="number"  v-model="seatRow" placeholder="几排"></el-input>
        <el-input type="number"   v-model="seatColumn" placeholder="几座"></el-input>
      </el-row>
    </el-row>
    <el-row style="margin-top: 10px">
      <el-button style="margin-top: 80px;background-color: rgb(102, 186, 183);
  color: white;
  border: 0px;
  width: 100px;" @click="doCheck">检票</el-button>
    </el-row>
  </div>
</template>

<script>
export default {
name: "check-tickets",
  data(){
  return{
    mid:'',
    showId:'',
    seatRow:'',
    seatColumn:'',
  }
  },
  methods:{
  doCheck(){
let self=this;
    var url = 'stadium/doCheck';
    var params = new URLSearchParams();
    params.append("mid",self.mid);
    params.append("showId",self.showId);
    params.append("stadiumId",parseInt(self.$route.params.id));
    params.append("seatRow",self.seatRow);
    params.append("seatColumn",self.seatColumn);
self.$axios({
  method: 'post',
  url: url,
  data: params,
}).then(function (response) {
  // console.log(response.data)
  if(response.data.code==200){
    self.$message.success(response.data.msg);
  }else {
    self.$message.error(response.data.msg);
  }
}).catch(function (error) {
  console.log(error);
});

  }
  }
}
</script>

<style scoped>
  .check{
    margin-left: 20px;
    margin-top: 40px;
    margin-bottom: 20px;
    background-color: white;
    box-shadow: 2px 2px 3px #BFBFBF;
    height: 300px;
  }
  .el-input{
    width: 200px;
    float: left;
    margin-left: 60px;
    margin-top: 20px;
  }
</style>
