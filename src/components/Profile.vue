<template>
<el-form v-loading.fullscreen.lock="loading" ref="profileForm":model="profileForm" status-icon :rules="rules">
  <el-form-item style="margin-top: 5%">
    <span id="title">个人资料</span>
  </el-form-item>
  <el-form-item label="昵称" prop="member" >
    <el-input type="text" v-model="profileForm.member" auto-complete="off" disabled=""></el-input>
  </el-form-item>
  <el-form-item label="邮箱" prop="email" >
    <el-input type="text" v-model="profileForm.email" auto-complete="off" disabled=""></el-input>
  </el-form-item>
  <el-form-item label="年龄" prop="age" >
    <el-input type="text" v-model.number="profileForm.age" auto-complete="off"></el-input>
  </el-form-item>
  <el-form-item label="状态" prop="state" >
    <el-input type="text" v-model="profileForm.state" auto-complete="off" ></el-input>
  </el-form-item>
  <el-form-item label="等级" prop="rank" >
    <el-input type="text" v-model="profileForm.rank" auto-complete="off" disabled=""></el-input>
  </el-form-item>
  <el-form-item label="积分" prop="points" >
    <el-input type="text" v-model="profileForm.points" auto-complete="off" disabled=""></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('profileForm')">保存</el-button>

  </el-form-item>
</el-form>
</template>

<script>
export default {
  name: "profile",
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('年龄不能为空'));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'));
        } else {
          if (value < 18) {
            callback(new Error('必须年满18岁'));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    var checkState = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入会员状态'));
      } else {
        if (value !== '会员'&&value!=='非会员') {
          callback(new Error("请输入'会员'或'非会员"))
        }
        callback();
      }
    };
    return {
      profileForm: {
        member: '',
        email: '',
        age: '',
        rank: '',
        points: '',
      },
      loading:false,
      rules: {
        age: [
          { validator: checkAge, trigger: 'blur' }
        ],
        state:[
          {validator:checkState,trigger:'blur'}
        ],
      }
    }
  },
  created(){
    this.fetchData();
  },
  methods: {
   fetchData(){
  let self=this;
  this.loading = true;
  var url = 'profile';
  var params=new URLSearchParams();
  var mid=self.$route.params.mid;
  params.append('mid',mid);
  self.$axios({
    method:'post',
    url:url,
    data:params,
  }).then(function (response) {
    console.log(response.data);
    self.profileForm.member=self.$route.params.mid;
    self.profileForm.email=response.data.email;
    self.profileForm.age=response.data.age;
    self.profileForm.state=response.data.state;
    self.profileForm.rank=response.data.rank;
    self.profileForm.points=response.data.points;
self.loading=false;

  }).catch(function (error) {
    console.log(error);
  });
},
    submitForm(formName) {
  let self=this;
      self.$refs[formName].validate((valid) => {
        if (valid) {
          var url = 'profile/change';
          var params = new URLSearchParams();
          var mid = self.profileForm.member;
          var age = self.profileForm.age;
          var state = self.profileForm.state;
          params.append('mid', mid);
          params.append('age', age);
          params.append('state', state);
          self.$axios({
            method: 'post',
            url: url,
            data: params,
          }).then(function (response) {
            console.log(response.data.msg);
            if (response.data.code == 200) {//更改个人资料成功
              console.log("更新成功");
            } else {
              console.log("失败");
            }
          }).catch(function (error) {
            console.log(error);

          });
        }
      });
    },
  }
}
</script>

<style scoped>
@import "../assets/css/Profile.css";
</style>
