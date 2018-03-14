import Vue from 'vue'
import Router from 'vue-router'

import homePage from '../components/HomePage'
import login from '../components/Login'
import register from '../components/Register'
import registerActive from '../components/RegisterActive'
import profile from '../components/Profile'
import showInfo from '../components/ShowInfo'
import discountCoupon from '../components/DiscountCoupon'
import buySelect from '../components/BuySelect'
import buyNoSelect from '../components/buyTicket/BuyNoSelect'
import selectSeat from '../components/SelectSeat'
import pay from '../components/Pay'
import complete from '../components/buyTicket/Complete'
import inputSeatNumber from '../components/buyTicket/InputSeatNumber'
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
      path: '/home/:id',
      name: 'dhome',
      component: homePage
    },
    {
      path: '/register/:code',
      name: 'registerActive',
      component: registerActive
    },
    {
      path:'/profile/:mid',
      name:'profile',
      component:profile,
    },
    {
      path:'/showInfo/:mid/:showId',
      name:'showInfo',
      component:showInfo,
    },
    {
      path:'/discountCoupon/:mid',
      name:'discountCoupon',
      component:discountCoupon
    },
    {
      path:'/buySelect/:mid/:stadiumId/:showId',
      // name:'buySelect',
      children:[
        {path:'',name:'selectSeat',component:selectSeat},
        {path:'step1',name:'step1',component:selectSeat},
        {path:'step2',name:'step2',component:pay},
        {path:'step3',name:'step3',component:complete},
      ],
      component:buySelect,

    },
    {
      path:'/buyNoSelect/:mid/:stadiumId/:showId/',
      // name:'buyNoSelect',
      children:[
        {path:'',name :'inputSeatNumber',component:inputSeatNumber},
        {path:'step1',name:'process1',component:inputSeatNumber},
        {path:'step2',name:'process2',component:pay},
        {path:'step3',name:'process3',component:complete},
      ],
      component:buyNoSelect,

    }

  ]

})
