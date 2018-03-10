<template>
  <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2"  label-width="100px" class="demo-ruleForm">
    <el-form-item class="item1">
      <span id="title">欢迎注册会员</span>
    </el-form-item>
    <el-form-item label="用户名" prop="member" >
      <el-input type="text" v-model="ruleForm2.member" placeholder="字母开头，不超过11位" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="邮箱" prop="email":rules="[
      { required: true, message: '请输入邮箱地址', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
    ]">
      <el-input type="text" v-model="ruleForm2.email" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="pass">
      <el-input type="password" v-model="ruleForm2.pass" placeholder="不超过11位"auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="checkPass">
      <el-input type="password" v-model="ruleForm2.checkPass"placeholder="不超过11位"auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="年龄" prop="age">
      <el-input v-model.number="ruleForm2.age"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
      <el-button @click="resetForm('ruleForm2')">重置</el-button>
    </el-form-item>
    <!--<el-form-item class="item1">-->
    <!--<span id="warning" v-show="ok">{{message}}</span>-->
    <!--</el-form-item>-->
  </el-form>

</template>

<script>
export default {
name: "register",
  data() {
  var checkName=(rule,value,callback)=>{
var nameExp=/^[a-zA-Z][a-zA-Z0-9\u4e00-\u9fa5]{1,10}$/
    if(!value){
      return callback(new Error('用户名不能为空'));
    }else if(value.length>11){
      return callback(new Error('用户名过长'));
    } else if(!nameExp.test(value)){
      return callback(new Error('格式不对'));
    }
    callback();
  }
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
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm2.checkPass !== '') {
          this.$refs.ruleForm2.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm2.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      ruleForm2: {
        member:'',
        email:'',
        pass: '',
        checkPass: '',
        age: '',

      },
      ok:false,
      message:'',
      rules2: {
        member:[
          {required:true,validator:checkName,tigger:'blur'}
        ],
        pass: [
          { required:true,validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { required:true,validator: validatePass2, trigger: 'blur' }
        ],
        age: [
          { validator: checkAge, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {

    submitForm(formName) {
      let self = this;
      self.$refs[formName].validate((valid) => {
        if (valid) {
          const url = 'register';
          var params = new URLSearchParams();
          var mid = self.ruleForm2.member;
          var mail = self.ruleForm2.email;
          var passw = self.ruleForm2.checkPass;
          var age = self.ruleForm2.age;
          params.append('mid', mid);
          params.append('email', mail);
          params.append('password', passw);
          params.append('age', age);
          self.$axios({
            method: 'post',
            url: url,
            data: params,
          }).then(function (response) {
            console.log(response.data.msg);
            if (response.data.code == 200) {//注册成功
            self.$message("请前往邮箱验证");
            } else {
              console.log("失败");
              self.ok = true;
              self.$message.error(response.data.msg);
              // self.message = response.data.msg;
            }
          }).catch(function (error) {
            console.log(error);
          });
        } else {
          console.log('error submit!!');
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    getParams() {
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
          self.$route.push('/');
        } else {
          console.log("激活失败");
          self.$message.error("激活失败");
        }
      }).catch(function (error) {
        console.log(error);

      });
    },
    watch:{
      '$route': 'getParams'
    }
}


}
</script>

<style scoped>
@import "../assets/css/Register.css";
</style>
