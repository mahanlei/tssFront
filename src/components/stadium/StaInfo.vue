<template>
  <div class="background">
    <el-form  v-loading.fullscreen.lock="loading" ref="staInfo":model="staInfo" status-icon>
      <el-form-item style="margin-top: 5%">
        <span id="title">场馆资料</span>
      </el-form-item>
      <el-form-item label="名称" prop="staName" >
        <el-input type="text" v-model="staInfo.staName" auto-complete="off" ></el-input>
      </el-form-item>
      <el-form-item label="地址" prop="address" >
        <el-input type="text" v-model="staInfo.address" auto-complete="off" disabled=""></el-input>
      </el-form-item>
      <el-form-item label="规格" prop="size" >
        <el-input style="width: 147px;" type="text" v-model.number="staInfo.seatRows" auto-complete="off" disabled=""></el-input>  排
        <el-input style="width: 150px;"  type="text" v-model.number="staInfo.seatColumns" auto-complete="off" disabled=""></el-input>  列
      </el-form-item>
      <el-form-item>
        <el-button type="primary" id="saveBt" @click="submitForm">保存修改</el-button>

      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
name: "sta-info",
  data(){
  return{
    staInfo:{
      staName:'',
      address:'',
      seatRows:'',
      seatColumns:'',
    },
    loading:true,
  }
  },
  created(){
    this.fetchData();
  },
  methods:{
  submitForm(){
    let self=this;
    var url='stadium/changeInfo';
    var params=new URLSearchParams();
    params.append("staId",self.$route.params.id);
    params.append("staName",self.staInfo.staName);
    self.$axios({
      method:'post',
      url:url,
      data:params,
    }).then(function (response) {
      console.log(response.data);
      if (response.data.code == 200) {//更改个人资料成功
        self.$message.success(response.data.msg);
      } else {
        self.$message.error(response.data.msg);
      }
    }).catch(function (error) {
      console.log(error);
    })
    },
    fetchData(){
      let self=this;
      var url='stadium/getStaInfo';
      var params=new URLSearchParams();
      params.append("staId",self.$route.params.id);
      self.$axios({
        method:'post',
        url:url,
        data:params,
      }).then(function (response) {
        self.staInfo.staName=response.data.staName;
        self.staInfo.address=response.data.address;
        self.staInfo.seatRows=response.data.seatRows;
        self.staInfo.seatColumns=response.data.seatColumns;
        self.loading=false;
      }).catch(function (error) {
        console.log(error);
      })
    }
  }
}
</script>

<style scoped>
  #title {
    font-size: 25px;
    color:rgb(235,122,119);
    margin-left: 0px;
    margin-top: 100px;
  }
  .el-input{
    width: 340px;
  }
  .el-form-item{
    margin-left:34%;
    width:435px;
    /*display: inline-block;*/
  }
  .background{
    background-color: white;
    box-shadow: 2px 2px 3px #BFBFBF;
    padding-top: 30px;
    height:600px;
    text-align: center;
  }
  #saveBt{
    margin-top: 100px;
    width: 200px;
    margin-left: 0;
    background-color: rgb(102, 186, 183);
    border: 0;
  }
</style>
