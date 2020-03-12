<template>
    <div id="home-nav">
      <nav-bar><div slot="center">购物车</div></nav-bar>
      <home-swiper :banners="banners"></home-swiper>
    </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import HomeSwiper from "./childComs/HomeSwiper";


  import {getMultiData} from "network/home";

  export default {
        name: "Home",
        components:{
          NavBar,
          HomeSwiper
        },
        data(){
          return {
            banners:[],
            recommends:[]
          }
        },
        created() {
          getMultiData().then(res=>{
            this.banners = res.data.banner.list
            this.recommends = res.data.recommend.list
          })
        }
  }
</script>

<style scoped>
  #home-nav{
    background-color: var(--color-tint); color: #FFF;}
</style>
