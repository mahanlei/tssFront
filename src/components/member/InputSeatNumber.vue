<template>
  <div>
  <el-steps :active=1 finish-status="success" align-center>
    <el-step title="购票数量" ></el-step>
    <el-step title="支付" ></el-step>
    <el-step title="完成" ></el-step>
  </el-steps>
  <el-form :model="numberValidateForm" ref="numberValidateForm" :rules="rules" label-width="100px"
           class="demo-ruleForm">
    <el-form-item id="item1" label="购买数量" prop="number">
      <el-input style="width: 200px" type="text" v-model.number="numberValidateForm.number"
                auto-complete="off" placeholder="限20张"></el-input>
    </el-form-item>
    <el-form-item style="margin-top: 90px">
      <el-button type="primary" @click="submitForm('numberValidateForm')">提交</el-button>
      <el-button style=" margin-right: 160px;" @click="resetForm('numberValidateForm')">重置</el-button>
    </el-form-item>
  </el-form>
  </div>
</template>

<script>
  export default {
    name: "input-seat-number",
    data() {
      var checkNumber = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('数量不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            if (value > 20) {
              callback(new Error('限20张'));
            } else {
              callback();
            }
          }
        }, 500);
      };
      return {
        numberValidateForm: {
          number: ''
        },
        rules: {
          number: [
            {validator: checkNumber, trigger: 'blur'}
          ]
        },

      }
    },
    methods: {
      submitForm(formName) {
        let self = this;
        self.$refs[formName].validate((valid) => {
          if (valid) {
            var params = new URLSearchParams();
            var mid = self.$route.params.mid;
            var showId = self.$route.params.showId;
            var stadiumId = self.$route.params.stadiumId;
            var number = self.numberValidateForm.number;
            params.append("mid", mid);
            params.append("showId", showId);
            params.append("stadiumId", stadiumId);
            params.append("number", number);
            self.$axios({
              method: 'post',
              url: '/buyTicket/getUnoccupiedSeats',
              data: params,
            }).then(function (response) {
              if (response.data.code == 200) {
                self.$router.push({
                  name: 'process2',
                  params: {
                    mid: mid,
                    stadiumId: stadiumId,
                    showId: showId,
                  }
                })
              } else {
                self.$message.error(response.data.msg);
              }
            })
          } else {
            self.$message.error("错误提交")
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style scoped>
  .demo-ruleForm {
    margin-top: 6%;
    background-color: white;
    box-shadow: 2px 2px 3px #BFBFBF;
    height: 300px;
  }

  #item1 {
    padding-top: 60px;
    width: 420px;
    margin-left: 32%;
  }

  .el-form-item__content {
    margin-left: 0;
  }

  .el-button {
    margin-right: 90px;
  }
</style>
