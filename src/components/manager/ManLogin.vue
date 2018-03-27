<template>
  <div class="background">
    <el-row class="content">
      <el-col :xs="24" :sm="{span: 6,offset: 9}">
      <span class="title">
       欢迎登录TSS
      </span>
        <el-row>
          <el-input v-model="account" placeholder="账号" clearable=""></el-input>
          <el-input v-model="password" placeholder="密码" type="password"></el-input>
          <el-button id="loginButton" type="primary" @click.native.prevent="handleLogin">登录</el-button>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
name: "man-login",
  data(){
  return{
    account: '',
    password: '',
  }

  },
  methods:{

    handleLogin: function () {
      const url = 'manager/login';
      let self = this;
      var params = new URLSearchParams();
      var uid = this.account;
      var passw = this.password;
      params.append('id', uid);
      params.append('password', passw);
      this.$axios({
        method: 'post',
        url: url,
        data: params,
      }).then(function (response) {
        if (response.data.code == 200) {
          console.log("成功登录");
          self.$message.success("登录成功");
          self.$router.push({
            name: "manHome",
          })
        } else {
          self.$message.error(response.data.msg);

        }
      }).catch(function (error) {
        console.log(error);
      });
    },
  }
}
</script>

<style scoped>
  @import "../../assets/css/member/Login.css";
</style>
