import Vue from 'vue'
import App from './App'

import ElementUI from 'element-ui' // 引入element-ui
import 'element-ui/lib/theme-chalk/index.css'
import VueRouter from 'vue-router'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import apiConfig from '../config/api.config'
import utils from '../config/utils'
import Vuex from 'vuex';
import store from './vuex/store'
import echarts from 'echarts'
Vue.use(Vuex);
Vue.use(ElementUI) ;// Vue全局使用
Vue.use(VueRouter);
Vue.use(VueAxios, axios);

Vue.prototype.$utils=utils;

axios.defaults.baseURL = apiConfig.baseUrl;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.prototype.$echarts = echarts;
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

