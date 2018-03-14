<template>
  <div>
    <el-row class="rowPanel1">
      <p style="  margin-top: 10px;">演出：{{showName}}</p>
      <p>场馆：{{staName}}</p>
      <p>共{{seatRows}}排{{seatColumns}}列</p>
    </el-row>
    <el-row class="rowPanel2">
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
       <el-alert title="" type="warning" description="最多购买6张票" close-text="我知道了" center>
        </el-alert>
      <el-tag
        v-for="tag in seats"
        :key="tag.name"
        closable
        :disable-transitions="false"
        :type="tag.type"
        @close="handleClose(tag)">
        {{tag.name}}
      </el-tag>
        <el-button style="margin-top: 100px;background-color: rgb(102, 186, 183);
  color: white;
  border: 0px;
  width: 100px;" @click="save">去支付</el-button>
      </el-row>

    </el-row>
    <!--<el-row style="height: 200px">-->
      <!---->
    <!--</el-row>-->

  </div>

</template>
<script>
  import ElRow from "element-ui/packages/row/src/row";
  // import store from '../assets/js/Store'

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
      }
    },
    // store:store,
    vuex:{
      action:{
        update:function({dispatch},value) {
          dispatch('UPDATE',value)
        }
      }
    },
    created() {
      this.fetchData();
    },

    methods: {

      save(){
        let self=this;
        let value=self.seats;
        self.update(value);
        self.$router.push({
          name:'step2',
          params
        })
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
        // console.log(rowValue);
        let self = this;
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
      getObjectValues(object)
  {
    var values = [];
    for (var property in object)
      values.push(object[property]);
    return values;
  },
      selectColumn(columnValue) {
        // console.log(rowValue);
        let self = this;
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
            var JSONObj={"name":row+"排"+columnValue+"列\n"+response.data.price+"元",
            "type":''};
            console.log(self.getObjectValues(self.seats));
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
        // self.optionsRow=[];
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
  @import "../assets/css/SelectSeat.css";
</style>
