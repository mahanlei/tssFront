<template>
  <div class="publish">
    <!--<el-row>-->
    <!--<el-upload-->
    <!--class="avatar-uploader"-->
    <!--action="https://jsonplaceholder.typicode.com/posts/"-->
    <!--:show-file-list="false"-->
    <!--:on-success="handleAvatarSuccess"-->
    <!--:before-upload="beforeAvatarUpload">-->
    <!--<img v-if="imageUrl" :src="imageUrl" class="avatar">-->
    <!--<i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
    <!--</el-upload>-->
    <!--</el-row>-->
    <el-row style="padding-top: 30px">
      <el-alert title="" type="warning" description="排：前1/3=120%定价，中间1/3=原价，后1/3=80%原价；
列：左1/3座位=右1/3座位=80%定价，中间1/3=定价" close-text="我知道了" center>
      </el-alert>
    </el-row>
    <el-row>
      <el-col :span="6" id="showName" >
      <el-input type="text"  v-model="showName" placeholder="演出名称"></el-input>
      </el-col>
      <el-col :span="4" id="showType1">
        <el-select v-model="type" placeholder="请选择演出类型" >
          <el-option
            v-for="item in showType"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row style="margin-top: 60px;padding-right: 480px">
      <el-date-picker
        v-model="value3"
        type="datetimerange"
        value-format="yyyy-MM-dd HH:mm:ss"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
    </el-row>
    <el-row style="padding-left: 170px;padding-right: 650px;margin-top:60px">
      <el-input type="number" placeholder="票价" v-model="price"></el-input>
    </el-row>
<el-row style="padding-left: 170px;padding-right: 650px;margin-top:60px">
  <el-input
    type="textarea"
    :rows="4"
    placeholder="请输入演出描述"
    v-model="description">
  </el-input>
</el-row>
    <el-row style="margin-top: 60px">
      <el-button  @click="doPublish()">发布演出</el-button>
    </el-row>
  </div>
</template>

<script>
export default {
name: "publish-show",
  data() {
    return {
      showName:'',
      showType: [{
        value: '1',
        label: '音乐会'
      }, {
        value: '2',
        label: '舞蹈'
      }, {
        value: '3',
        label: '话剧'
      }, {
        value: '4',
        label: '体育比赛'
      }, {
        value: '5',
        label: '电影'
      },{
        value: '6',
        label: '演唱会'
    }],
      type: '',
      value3: '',
      imageUrl: '',
      description:'',
      price:'',
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      console.log(this.imageUrl);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 8;

      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 8MB!');
      }
      return isJPG && isLt2M;
    },
    doPublish(){
let self=this;
      var url = 'stadium/publishShow';
      var params = new URLSearchParams();
      var showName = self.showName;
      var showType=self.type;
var startTime=self.value3[0];
var endTime=self.value3[1];
      var stadiumId = parseInt(self.$route.params.id);
var description=self.description;
var price=self.price;
      params.append("showName", showName);
      params.append("stadiumId", stadiumId);
      params.append("type", showType);
      params.append("startTime",startTime);
      params.append("endTime",endTime);
      params.append("description",description);
      params.append("price",price);
      console.log(startTime);
self.$axios({
  method: 'post',
  url: url,
  data: params,
}).then(function (response) {
  console.log(response.data);
  if(response.data.code==200){
    self.$message.success(response.data.msg);
  }else self.$message.error(response.data.msg);
}).catch(function (error) {
  console.log(error);
});
    },
  }
}
</script>

<style scoped>
  @import "../../assets/css/stadium/PublicShow.css";
</style>
