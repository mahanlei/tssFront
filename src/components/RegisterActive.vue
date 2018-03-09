<template>
<el-button v-on:click="active" style="margin-top: 30%">验证邮箱</el-button>
</template>

<script>
export default {
name: "register-active",
  data(){
  return {
    ok:false,
    message:'',
  }

  },
  methods:{

    active :function() {
      let self = this;
      // 取到路由带过来的参数
      console.log(self.$route.params.code);
      let code = self.$route.params.code;
      var params = new URLSearchParams();
      params.append('code', code);
      self.$axios({
        method: 'post',
        url: '/register/activeMember',
        data: params,
      }).then(function (response) {
        console.log(response.data.msg);
        if (response.data.code == 200) {//激活成功
          self.$router.push('/');
        } else {
          console.log("激活失败");
          alert("激活失败");
        }
      }).catch(function (error) {
        console.log(error);

      });
    },
    // watch:{
    //   '$route': 'getParams'
    // }
  }
}

</script>

<style scoped>

</style>
