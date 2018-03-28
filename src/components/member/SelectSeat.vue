<template>
  <div v-loading.fullscreen.lock="loading">
    <el-steps :active=1 finish-status="success" align-center>
      <el-step title="选座" ></el-step>
      <el-step title="支付" ></el-step>
      <el-step title="完成" ></el-step>
    </el-steps>
    <el-row class="rowPanel1">
      <p style="  margin-top: 10px;">演出：{{showName}}</p>
      <p>场馆：{{staName}}</p>
      <p>共{{seatRows}}排{{seatColumns}}列</p>
    </el-row>
    <el-row class="rowPanel2">
      <el-alert title="" type="warning" description="最多购买6张票" close-text="我知道了" center>
      </el-alert>
      <el-select v-model="rowValue" placeholder="请选择排数" @change="selectRow">
        <el-option
          v-for="item in optionsRow"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          :disabled="item.disabled">
        </el-option>
      </el-select>
      排
      <el-select v-model="columnValue" placeholder="请选择列数" @change="selectColumn">
        <el-option
          v-for="item in optionsColumn"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          :disabled="item.disabled">
        </el-option>
      </el-select>
      列
      <el-row style="margin-top: 30px">

      <el-tag
        v-for="tag in seats"
        :key="tag.name"
        closable
        :disable-transitions="false"
        @close="handleClose(tag)">
        {{tag.name}}
      </el-tag>
      </el-row>
      <el-row style="margin-top: 60px">
        <el-button style="margin-top: 100px;background-color: rgb(102, 186, 183);
  color: white;
  border: 0px;
  width: 100px;" @click="confirmTickets">确认订单</el-button>
      </el-row>
    </el-row>
    <!--<el-row style="height: 200px">-->
      <!---->
    <!--</el-row>-->

  </div>

</template>
<script>
  import ElRow from "element-ui/packages/row/src/row";

  export default {
    components: {ElRow},
    name: "select-seat",
    data() {
      return {
        showName: '',
        staName: '',
        seatRows: '',
        seatColumns: '',
        rowValue: '',
        columnValue: '',
        optionsRow: [],
        optionsColumn: [],
        seats:[],
        loading :true,
      }
    },
    created() {
      this.fetchData();
    },

    methods: {

      confirmTickets(){
        let self=this;
        var url = '/buyTicket/confirmSeats';
        var params = new URLSearchParams();
        var mid=self.$route.params.mid;
        var showId = self.$route.params.showId;
        var stadiumId = self.$route.params.stadiumId;
        var dataList=[];
        for(var i=0;i<self.seats.length;i++){
          var obj={"mid":mid,"showId":showId,"stadiumId":stadiumId,
            "seatRow":self.seats[i].row,"seatColumn":self.seats[i].column,
            "price":self.seats[i].price}
             dataList.push(obj);
        }
        var data=JSON.stringify(dataList);
        console.log(data);
        params.append("seats",data);
        // params.append("mid",mid);
        self.$axios({
          method:'post',
          url:url,
          data:params,
        }).then(function (response) {

         self.$router.push({
           name:'step2',
           params:{
                   mid:mid,
                   stadiumId:stadiumId,
                   showId:showId,
                 }
         });
        }).catch(function (error) {
          console.log(error);
        });
      },
      fetchData() {
        let self = this;
        this.loading = true;
        var url = '/show/showInfo';
        var params = new URLSearchParams();
        var showId = self.$route.params.showId;
        params.append('showId', showId);
        self.$axios({
          method: 'post',
          url: url,
          data: params,
        }).then(function (response) {
          // console.log(response.data);
          self.showName = response.data.name;
          self.staName = response.data.staName;
          self.seatRows = response.data.seatRows;
          self.seatColumns = response.data.seatColumns;
          self.loading = false;

          for (var i = 1; i <= self.seatRows; i++) {
            var JSONObj = {"value": i, "label": "第" + i + "排", "disabled": false};
            self.optionsRow.push(JSONObj);
          }


        }).catch(function (error) {
          console.log(error);
        });
      },
      selectRow(rowValue) {
        let self = this;
        self.optionsColumn=[];

        var url = '/seat/getSeatList';
        var params = new URLSearchParams();
        var showId = self.$route.params.showId;
        var stadiumId = self.$route.params.stadiumId;

        params.append("showId", showId);
        params.append("stadiumId", stadiumId);
        params.append("row", rowValue);
        self.$axios({
          method: 'post',
          url: url,
          data: params,
        }).then(function (response) {
          console.log(response.data);
          for (var i = 0; i < response.data.length; i++) {
            self.optionsColumn.push(response.data[i]);
          }
        }).catch(function (error) {
          console.log(error);
        });

      },

      selectColumn(columnValue) {
        let self = this;
        self.optionsColumn=[];

        var url = '/seat/getSeatPrice';
        var params = new URLSearchParams();
        var showId = self.$route.params.showId;
        var stadiumId = self.$route.params.stadiumId;
        var row= self.rowValue;
        params.append("showId", showId);
        params.append("stadiumId", stadiumId);
        params.append("row",row);
        params.append("column",columnValue);
        self.$axios({
          method: 'post',
          url: url,
          data: params,
        }).then(function (response) {
          console.log(response.data);
          // for (var i = 0; i < response.data.length; i++) {
            var JSONObj={"name":row+"排"+columnValue+"座"+response.data.price+"元",
              "row":row,"column":columnValue,"price":response.data.price};
            // console.log(self.getObjectValues(self.seats));
            // console.log(self.seats.indexOf(JSONObj));
            // if(self.getObjectValues(self.seats).(JSONObj)==-1) {

            if(self.seats.length>=6){
              self.$message.error("请不要再购买了");
            }else {
              for(var i=0;i<self.seats.length;i++){
                if(self.seats[i].name==JSONObj.name){
                  self.$message.error("请不要重复选座");
                 return;
                }
              }
              self.seats.push(JSONObj);
            }

        }).catch(function (error) {
          console.log(error);
        });
        self.optionsColumn=[];
        self.rowValue='';
        self.columnValue='';

      },

      handleClose(tag){
        this.seats.splice(this.seats.indexOf(tag), 1);
      },

    },

  }
</script>

<style scoped>
  @import "../../assets/css/member/SelectSeat.css";
</style>
