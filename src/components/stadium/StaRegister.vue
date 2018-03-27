<template>
  <div class="background">
    <el-form  ref="staInfo" :model="staInfo" status-icon :rules="rules">
      <el-form-item style="margin-top: 5%">
        <span id="title">场馆注册</span>
      </el-form-item>
      <el-form-item label="名称" prop="staName" >
        <el-input type="text" v-model="staInfo.staName" auto-complete="off" ></el-input>
      </el-form-item>
      <el-form-item label="地址" prop="address" >
        <el-input type="text" v-model="staInfo.address" auto-complete="off" ></el-input>
      </el-form-item>
      <el-form-item label="规格" prop="size" >
        <el-input style="width: 147px;" type="text" v-model.number="staInfo.seatRows" auto-complete="off" ></el-input>  排
        <el-input style="width: 150px;"  type="text" v-model.number="staInfo.seatColumns" auto-complete="off" ></el-input>  列
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="staInfo.pass" placeholder="不超过11位"auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass" style="   margin-left:33%;">
        <el-input type="password" v-model="staInfo.checkPass"placeholder="不超过11位"auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" id="saveBt" @click="submitForm">确认注册</el-button>

      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
name: "sta-register",
data(){
  var validatePass = (rule, value, callback) => {
    if (value === '') {
      callback(new Error('请输入密码'));
    } else {
      if (this.staInfo.checkPass !== '') {
        this.$refs.staInfo.validateField('checkPass');
      }
      callback();
    }
  };
  var validatePass2 = (rule, value, callback) => {
    if (value === '') {
      callback(new Error('请再次输入密码'));
    } else if (value !== this.staInfo.pass) {
      callback(new Error('两次输入密码不一致!'));
    } else {
      callback();
    }
  };
  return{
    staInfo:{
      staName:'',
      address:'',
      seatRows:'',
      seatColumns:'',
      pass:'',
      checkPass:'',
    },
    rules: {
      pass: [
        { required:true,validator: validatePass, trigger: 'blur' }
      ],
      checkPass: [
        { required:true,validator: validatePass2, trigger: 'blur' }
      ],
    }
  }
},
methods:{
  submitForm(){
    let self=this;
    var url='stadium/register';
    var params=new URLSearchParams();
    params.append("address",self.staInfo.address);
    params.append("staName",self.staInfo.staName);
    params.append("seatRows",self.staInfo.seatRows);
    params.append("seatColumns",self.staInfo.seatColumns);
    params.append("password",self.staInfo.checkPass);
    self.$axios({
      method:'post',
      url:url,
      data:params,
    }).then(function (response) {
      console.log(response.data);
      if (response.data.code == 200) {
        self.$message.success(response.data.msg);
      } else {
        self.$message.error(response.data.msg);
      }
    }).catch(function (error) {
      console.log(error);
    })
  },
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
    margin-left: 20px;
    width: 100%;
    height:100%;
    text-align: center;
  }
  .background:before{
    background: url("https://images.unsplash.com/photo-1487700160041-babef9c3cb55?ixlib=rb-0.3.5&s=a176324041bf71a93749f51654dc0888&auto=format&fit=crop&w=2070&q=80") top center no-repeat;
    background-size: cover;
    /*使用cover的意思是把背景图片充满整个容器，而不考虑是不是可以看到完整的图片；*/
    /*使用contain的意思是在容器里完整显示图片，而不考虑容器是否被填满。*/
    width: 1440px;
    height: 900px;
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;/*-1 可以当背景*/
    -webkit-filter: blur(4px);
    filter: blur(1px);
  }
  #saveBt{
    margin-top: 100px;
    width: 200px;
    margin-left: 0;
    background-color: rgb(102, 186, 183);
    border: 0;
  }
</style>
