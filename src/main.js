// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui' // 引入element-ui
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import VueRouter from 'vue-router'

Vue.use(ElementUI) ;// Vue全局使用
Vue.use(VueRouter);
Vue.config.productionTip = false
import homePage from './components/HomePage'
import login from './components/Login'

const router =  new VueRouter({
  mode: 'history', // 开启HTML5的history模式，可以让地址栏的url长得跟正常页面跳转的url一样。（不过还需要后端配合，讲Koa的时候会说）
  base: __dirname,
  routes: [
    {
      path: '/',  // 默认首页打开是登录页
      component: homePage
    },
    {
      path: '/login',
      component: login
    },
    {
      path: '*',
      redirect: '/' // 输入其他不存在的地址自动跳回首页
    }
  ]
})

const app = new Vue({
  router: router, // 启用router
  render: h => h(App)
}).$mount('#app') //挂载到id为app的元素上

/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   components: { App },
//   template: '<App/>'
// })
