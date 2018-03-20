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

import qs from 'qs'
Vue.use(Vuex);
Vue.use(ElementUI) ;// Vue全局使用
Vue.use(VueRouter);
Vue.use(VueAxios, axios);

Vue.prototype.$utils=utils;

axios.defaults.baseURL = apiConfig.baseUrl;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.config.productionTip = false;
Vue.prototype.$axios = axios;

// const router =  new VueRouter({
//   mode: 'history', // 开启HTML5的history模式，可以让地址栏的url长得跟正常页面跳转的url一样。（不过还需要后端配合，讲Koa的时候会说）
//   routes
// })

// const app = new Vue({
//   router, // 启用router
//   render: h => h(App)
// }).$mount('#app') //挂载到id为app的元素上

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

