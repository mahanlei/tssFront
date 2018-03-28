<template>
  <div v-loading.fullscreen.lock="loading">
    <el-tabs v-model="activeName" @tab-click="handleClick(activeName)">
      <el-tab-pane label="注册申请" name="first">
        <div class="applicationList" v-for="(registerApplication,index) in registerApplications ":key="registerApplication" >
          <div>
            <el-row style="height: 180px">
              <el-col :span="4">
                <div class="appId">
                <span >{{registerApplication.aid}}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div style="padding: 14px;padding-left: 100px;margin-top: 10px">
                  <el-row class="infoDetail">
                    <span  style="font-size: 20px;color:rgb(247, 196, 66) ">场馆名称：{{registerApplication.staName}}</span>
                  </el-row>
                  <el-row class="infoDetail">
                    <span >规格：{{registerApplication.seatRows}}排{{registerApplication.seatColumns}}列</span>
                  </el-row>
                  <el-row class="infoDetail">
                    <span  >地址：{{registerApplication.address}}</span>
                  </el-row>
                </div>
              </el-col>
              <el-col :span="6">
                <el-button class="agreeBt" @click="doRegisterAgreed(index)">同意</el-button>
              </el-col>
            </el-row>
          </div>

        </div>

      </el-tab-pane>
      <el-tab-pane label="修改申请" name="second">
        <div class="applicationList" v-for="(changeApplication,index) in changeApplications ":key="changeApplication" >
          <div>
            <el-row style="height: 180px">
              <el-col :span="4">
                <div class="appId">
                <span >{{changeApplication.aid}}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div style="padding: 14px;padding-left: 50px;margin-top: 30px">
                  <el-row class="infoDetail">
                    <span  style="font-size: 20px;color:rgb(247, 196, 66) ">场馆更改为：{{changeApplication.staName}}</span>
                  </el-row>
                </div>
              </el-col>
              <el-col :span="6">
                <el-button class="agreeBt" @click="doChangeAgreed(index)">同意</el-button>
              </el-col>
            </el-row>
          </div>

        </div>
      </el-tab-pane>
      <el-tab-pane label="注册申请（通过）" name="third">
        <div class="applicationList" v-for="(passedApplication,index) in passedApplications ":key="passedApplication" >
          <div>
            <el-row style="height: 180px">
              <el-col :span="4">
                <div class="appId">
                <span >{{passedApplication.aid}}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div style="padding: 14px;padding-left: 140px;margin-top: 10px">
                  <el-row class="infoDetail">
                    <span  style="font-size: 20px;color:rgb(247, 196, 66) ">场馆名称：{{passedApplication.staName}}</span>
                  </el-row>
                  <el-row class="infoDetail">
                    <span >规格：{{passedApplication.seatRows}}排{{passedApplication.seatColumns}}列</span>
                  </el-row>
                  <el-row class="infoDetail">
                    <span  >地址：{{passedApplication.address}}</span>
                  </el-row>
                </div>
              </el-col>
            </el-row>
          </div>

        </div>
      </el-tab-pane>
      <el-tab-pane label="修改申请（通过）" name="fourth">
        <div class="applicationList" v-for="(passedApplication2,index) in passedApplications2 ":key="passedApplication" >
          <div>
            <el-row style="height: 90px">
              <el-col :span="4">
                <div class="appId" style="margin-top: 7px">
                <span>{{passedApplication2.aid}}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div style="padding: 14px;padding-left: 100px">
                  <el-row class="infoDetail">
                    <span  style="font-size: 20px;color:rgb(247, 196, 66) ">场馆名改为：{{passedApplication2.staName}}</span>
                  </el-row>
                </div>
              </el-col>
            </el-row>
          </div>

        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
name: "man-approval",
  data(){
  return{
    registerApplications:[],
    changeApplications:[],
    passedApplications:[],
    passedApplications2:[],
    load:false,
    activeName:'first',
  }

  },
  created() {
    this.fetchData();
  },
  methods:{
  fetchData(){

    let self=this;
var url='getApplications';
    var type=1;
    var state=0;
    var params = new URLSearchParams();
    params.append("type",type);
    params.append("state",state);
    self.$axios({
      method: 'post',
      url: url,
      data: params,
    }).then(function (response) {
      for(var i=0;i<response.data.length;i++){
        var obj={"aid":response.data[i].aid,
          "stadiumId":response.data[i].stadiumId,
          "staName":response.data[i].staName,
        "seatRows":response.data[i].seatRows,
          "seatColumns":response.data[i].seatColumns,
        "address":response.data[i].address};
        self.registerApplications.push(obj);
      }

    }).catch(function (error) {
      console.log(error);
    })
  },
    handleClick(activeName){
      let self=this;
switch (activeName){
  case 'first':
    self.registerApplications=[];
    self.fetchData();
    break;
  case 'second':
    self.changeApplications=[];
    var url='getApplications';
    var type=2;
    var state=0;
    var params = new URLSearchParams();
    params.append("type",type);
    params.append("state",state);
    self.$axios({
      method: 'post',
      url: url,
      data: params,
    }).then(function (response) {
      for(var i=0;i<response.data.length;i++){
        var obj={"aid":response.data[i].aid,
          "stadiumId":response.data[i].stadiumId,
          "staName":response.data[i].staName,
          "seatRows":response.data[i].seatRows,
          "seatColumns":response.data[i].seatColumns,
          "address":response.data[i].address};
        self.changeApplications.push(obj);
      }

    }).catch(function (error) {
      console.log(error);
    });
    break;
  case 'third':
    self.passedApplications=[];
    var url='getApplications';
    var type=1;
    var state=1;
    var params = new URLSearchParams();
    params.append("type",type);
    params.append("state",state);
    self.$axios({
      method: 'post',
      url: url,
      data: params,
    }).then(function (response) {
      for(var i=0;i<response.data.length;i++){
        var obj={"aid":response.data[i].aid,
          "stadiumId":response.data[i].stadiumId,
          "staName":response.data[i].staName,
          "seatRows":response.data[i].seatRows,
          "seatColumns":response.data[i].seatColumns,
          "address":response.data[i].address};
        self.passedApplications.push(obj);
      }

    }).catch(function (error) {
      console.log(error);
    });
    break;
  case 'fourth':
    self.passedApplications2=[];
    var url='getApplications';
    var type=2;
    var state=1;
    var params = new URLSearchParams();
    params.append("type",type);
    params.append("state",state);
    self.$axios({
      method: 'post',
      url: url,
      data: params,
    }).then(function (response) {
      for(var i=0;i<response.data.length;i++){
        var obj={"aid":response.data[i].aid,
          "stadiumId":response.data[i].stadiumId,
          "staName":response.data[i].staName,
          "seatRows":response.data[i].seatRows,
          "seatColumns":response.data[i].seatColumns,
          "address":response.data[i].address};
        self.passedApplications2.push(obj);
      }

    }).catch(function (error) {
      console.log(error);
    });
    break;
}
    },
    doRegisterAgreed(index){
      let self=this;
      var url='agreeApplication'
        var params = new URLSearchParams();
        var aid=self.registerApplications[index].aid;
        var stadiumId=self.registerApplications[index].stadiumId;
        params.append("aid",aid);
        params.append("stadiumId",stadiumId);
        self.$axios({
          method:'post',
          url:url,
          data:params,
        }).then(function (response) {
         if(response.data.code==200){
           self.$message.success(response.data.msg)

         }else {
           self.$message.error(response.data.msg)
         }
        }).catch(function (error) {
          console.log(error);
        })
    },
    doChangeAgreed(index){
      let self=this;
      var url='agreeApplication'
      var params = new URLSearchParams();
      var aid=self.changeApplications[index].aid;
      var stadiumId=self.changeApplications[index].stadiumId;
      params.append("aid",aid);
      params.append("stadiumId",stadiumId);
      self.$axios({
        method:'post',
        url:url,
        data:params,
      }).then(function (response) {
        if(response.data.code==200){
          self.$message.success(response.data.msg)

        }else {
          self.$message.error(response.data.msg)
        }
      }).catch(function (error) {
        console.log(error);
      })
    }
  }
}
</script>

<style scoped>
@import "../../assets/css/manager/ManApproval.css";
</style>
