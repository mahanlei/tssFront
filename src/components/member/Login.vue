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
        <el-button id="registerButton" type="primary" v-on:click="handleRegister">注册</el-button>
        <!--<h4 id="warning" v-show="ok">{{message}}</h4>-->
      </el-row>
    </el-col>
  </el-row>
  </div>
</template>

<script>

  export default {
    name: "login",
    data() {
      return {
        account: '',
        password: '',
        ok:true,
        message:'',
      };
    },
    methods: {
      handleLogin: function () {
        const url = 'login';
        let self = this;
        var params = new URLSearchParams();
        var uid = this.account;
        var passw = this.password;
        params.append('account', uid);
        params.append('password', passw);
        this.$axios({
          method: 'post',
          url: url,
          data: params,
        }).then(function (response) {
          // console.log(response.data.msg);
          if (response.data.code == 200) {
            console.log("成功登录");
            self.$message.success("登录成功");
            self.$router.push({
              name: "dhome",
              params: {
                id: uid
              }
            })
          }else {
            self.ok =true;
            self.$message.error(response.data.msg);

          }
        }).catch(function (error) {
            console.log(error);
          });
      },
      handleRegister:function (event) {
        let self=this;
        self.$router.push('/register');
      },

    }
  }
</script>

<style scoped>
  @import "../../assets/css/member/Login.css";

</style>
