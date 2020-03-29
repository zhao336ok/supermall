<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物车</div></nav-bar>
    <tab-control class="tab-control" :titles="['流行', '新款', '精选']" @tabClick="tabClick" ref="tabControl1" v-show="isTabFixed"></tab-control>
    <scroll class="content" ref="scroll"
            :probe-type="3"
            :pull-up-load="true"
            @scroll="contentScroll"
            @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view/>
      <tab-control :titles="['流行', '新款', '精选']" @tabClick="tabClick" ref="tabControl2"></tab-control>
      <goods-list :goods="goodsShow"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  import HomeSwiper from "./childComs/HomeSwiper";
  import RecommendView from "./childComs/RecommendView";
  import FeatureView from "./childComs/FeatureView";

  import NavBar from "components/common/navbar/NavBar";
  import TabControl from "components/content/tabControl/TabControl";
  import GoodsList from "components/content/goods/GoodsList";
  import Scroll from "components/common/scroll/Scroll";
  import BackTop from "components/content/backtop/BackTop";

  import {getMultiData, getHomeGoods} from "network/home";
  import {debounce} from "common/utils";
  import {itemListenerMixin, backTopMixin} from "common/mixin";
  import {NEW, POP, SELL} from "common/const";

  export default {
    name: "Home",
    components:{
      NavBar,
      TabControl,
      Scroll,
      BackTop,
      GoodsList,
      HomeSwiper,
      RecommendView,
      FeatureView
    },
    mixins:[itemListenerMixin, backTopMixin],
    data(){
      return {
        banners:[],
        recommends:[],
        goods: {
          'pop': {page: 0, list: []},
          'new':{page: 0, list: []},
          'sell':{page: 0, list: []},
        },
        goodsType: POP,
        isBackTopShow: false,
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0
      }
    },
    mounted() {
      const refresh = debounce(this.$refs.scroll.refresh, 50)
      //监听item中图片加载完成
      this.$bus.$on('imgLoad', ()=>{
        refresh()
      })
    },
    activated() {
      this.$refs.scroll.scrollTo(0, this.saveY, 0);
      this.$refs.scroll.refresh();
    },
    deactivated() {
      this.saveY = this.$refs.scroll.getScrollY();
      this.$bus.$off('itemImgLoad', this.itemImgListener);
    },
    created() {

      //请求banner数据
      this.getMultiData();

      //请求商品数据
      this.getHomeGoods(POP);
      this.getHomeGoods(NEW);
      this.getHomeGoods(SELL);

    },
    methods:{
      /**
       * 事件监听相关方法
       */
      tabClick(index){
        switch (index) {
          case 0:
            this.goodsType = 'pop';
            break;
          case 1:
            this.goodsType = 'new';
            break;
          case 2:
            this.goodsType = 'sell';
            break
        }
        this.$refs.tabControl1.selIndex = index
        this.$refs.tabControl2.selIndex = index
      },
      backClick(){
        this.$refs.scroll.scrollTo(0, 0, 500)
      },
      contentScroll(position){
        this.listenShowBackTop(position);//返回顶部
        this.isTabFixed = (-position.y) > this.tabOffsetTop;
      },
      loadMore(){
        this.getHomeGoods(this.goodsType)
      },
      swiperImageLoad(){
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      },

      /**
       * 网络请求
       */
      getMultiData(){
        getMultiData().then(res=>{
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        });
      },

      getHomeGoods(type){
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res=>{
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page += 1
          this.$refs.scroll.finishPullUp()
        })
      }
    },
    computed:{
      goodsShow(){
        return this.goods[this.goodsType].list
      }

    }
  }
</script>

<style scoped>
  #home{
    /*padding-top: 44px;*/
    height: 100vh;
    position: relative;
  }
  .home-nav{
    /*position: fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 0;*/
    /*z-index: 9;*/
    width: 100%;
    background-color: var(--color-tint); color: #FFF;}
  .tab-control{
    /*position: sticky;*/
    /*top: 44px;*/
    /*z-index: 9;*/
    position: relative;
    z-index: 9;
    background: #FFF;}
  .content{
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  .btdisplay{ display: none;}
</style>
