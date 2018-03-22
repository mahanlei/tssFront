<template>
  <div id="app">
    <!--<homePage></homePage>-->
    <!--<login></login>-->
    <router-view></router-view>
  </div>
</template>

<script>
  import  homePage from './components/member/HomePage'
  import login from './components/member/Login'

export default {
  name: 'App',
  data(){
    return{
      message:'Hello Vue!'
    }
  },
  components: {
    homePage ,
    login}
}

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
  width: 100%;
}
</style>
