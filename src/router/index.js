import Vue from 'vue'
import Router from 'vue-router'

import homePage from '../components/member/HomePage'
import login from '../components/member/Login'
import register from '../components/member/Register'
import registerActive from '../components/member/RegisterActive'
import profile from '../components/member/Profile'
import showInfo from '../components/member/ShowInfo'
import discountCoupon from '../components/member/DiscountCoupon'
import buySelect from '../components/member/BuySelect'
import buyNoSelect from '../components/member/BuyNoSelect'
import selectSeat from '../components/member/SelectSeat'
import pay from '../components/member/Pay'
import complete from '../components/member/Complete'
import inputSeatNumber from '../components/member/InputSeatNumber'
import myOrder from '../components/member/MyOrder'
import staLogin from '../components/stadium/StaLogin'
import staHome from '../components/stadium/StaHomepage'
import staInfo from '../components/stadium/StaInfo'
import checkTickets from '../components/stadium/CheckTickets'
import existingShow from '../components/stadium/ExistingShow'
import offlineTicket from '../components/stadium/OfflineTicket'
import publishShow from '../components/stadium/PublishShow'
import offlinePay from '../components/stadium/OfflinePay'
import staFinance from '../components/stadium/StaFinance'
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
      path:'/myOrder/:mid',
      name:'myOrder',
      component:myOrder,
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
      path:'/buyNoSelect/:mid/:stadiumId/:showId',
      // name:'buyNoSelect',
      children:[
        {path:'',name :'inputSeatNumber',component:inputSeatNumber},
        {path:'step1',name:'process1',component:inputSeatNumber},
        {path:'step2',name:'process2',component:pay},
        {path:'step3',name:'process3',component:complete},
      ],
      component:buyNoSelect,

    },
    //场馆相关界面路由
    {
      path:'/stadium/login',
      name:'staLogin',
      component:staLogin,
    },
    {
      path:'/stadium/home/:id',
      // name:'staHome',
      component:staHome,
      children:[
        {path:'',name:'existingShow',component:existingShow},
        {path:'offlineTicket/:showId',name:'offlineTicket',component:offlineTicket},
        {path:'offlinePay/:mid/:showId',name:'offlinePay',component:offlinePay},
        {path:'checkTickets',name:'checkTickets',component:checkTickets},
        {path:'publishShow',name:'publishShow',component:publishShow},
        {path:'staInfo',name:'staInfo',component:staInfo},
        {path:'staFinance',name:'staFinance',component:staFinance}

      ]
    }

  ]

})
