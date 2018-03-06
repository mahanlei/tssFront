import Vue from 'vue'
import Router from 'vue-router'

import homePage from '../components/HomePage'
import login from '../components/Login'
import register from '../components/Register'
import registerActive from '../components/RegisterActive'
import profile from '../components/Profile'
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: homePage
    },
    {
      path: '/login',
      name: 'login',
      component: login,
    },
    {
      path: '/register',
      name: 'register',
      component: register


    },
    {
      path: '*',
      redirect: '/' // 输入其他不存在的地址自动跳回首页
    },
    {
      path: '/:id',
      name: 'dhome',
      component: homePage
    },
    {
      path: '/register/:code',
      name: 'registerActive',
      component: registerActive
    },
    {
      path:'/profile',
      name:'profile',
      component:profile,
    }
  ]

})
