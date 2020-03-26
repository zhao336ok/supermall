<template>
  <div id="detail">
    <detail-nav-bar class="detail_nav" ref="nav" @titleClick="titleClick"/>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :topImages="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info ref="params" :param-info="paramInfo"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <goods-list ref="recommend" :goods="recommends" />
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"/>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  import DetailNavBar from "./detailComs/DetailNavBar";
  import DetailSwiper from "./detailComs/DetailSwiper";
  import DetailBaseInfo from "./detailComs/DetailBaseInfo";
  import DetailShopInfo from "./detailComs/DetailShopInfo";
  import DetailGoodsInfo from "./detailComs/DetailGoodsInfo";
  import DetailParamInfo from "./detailComs/DetailParamInfo";
  import DetailCommentInfo from "./detailComs/DetailCommentInfo";
  import DetailBottomBar from "./detailComs/DetailBottomBar";

  import Scroll from "components/common/scroll/Scroll";
  import GoodsList from "components/content/goods/GoodsList";

  import {getDetil, Goods, Shop, GoodsParam, getRecommend} from "network/detail";
  import {itemListenerMixin, backTopMixin} from "common/mixin";
  import {debounce} from "common/utils";
  import BackTop from "../../components/content/backtop/BackTop";

  export default {
    name: "Detail",
    components:{
      BackTop,
      DetailBaseInfo,
      DetailNavBar,
      DetailSwiper,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
      Scroll,
      GoodsList
    },
    mixins:[itemListenerMixin, backTopMixin],
    data(){
      return {
        iid: null,
        topImages: null,
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        themeTopYs: [],
        getThemeTopY: null,
        selIndex: 0,
      }
    },
    created() {
      //获取iid
      this.iid = this.$route.params.iid;
      //获取详细数据
      getDetil(this.iid).then(res=>{
        // console.log(res);
        const data = res.result
        //轮播图片
        this.topImages = data.itemInfo.topImages;
        //商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        //店铺信息
        this.shop = new Shop(data.shopInfo);
        //商品详细数据
        this.detailInfo = data.detailInfo;
        //商品属性
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);
        //评论信息
        if(data.rate.CRate !== 0){
          this.commentInfo = data.rate.list[0];
        }
      });
      //获取推荐数据
      getRecommend().then(res=>{
        this.recommends = res.data.list;
      })
      //给getThemeTopYs赋值
      this.getThemeTopY = debounce(()=>{
        this.themeTopYs = [];
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        this.themeTopYs.push(Number.MAX_VALUE);
      },100)

    },
    methods:{
      imageLoad(){
        this.newRefresh();
        this.getThemeTopY();
      },
      titleClick(index){
        // console.log(index);
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 300);
      },
      contentScroll(position){
        const positionY = -position.y;
        let length = this.themeTopYs.length;
        for (let i = 0; i < length - 1; i++){
          if (this.selIndex !== i && (positionY >= this.themeTopYs[i] && positionY< this.themeTopYs[i+1])){
            this.selIndex = i;
            this.$refs.nav.selIndex = this.selIndex;
          }
          // if (this.selIndex !== i && ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) || (i === length - 1 && positionY >= this.themeTopYs[i] ))){
          //   this.selIndex = i;
          //   this.$refs.nav.selIndex = this.selIndex;
          // }
          //是否显示回到顶部
          this.listenShowBackTop(position);
        }

      },
      addToCart(){
        //获取购物车需要展示的信息
        const product = {}
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid;

        //将商品添加到购物车
        // this.$store.commit('addCart', product);
        this.$store.dispatch('addCart', product);


      }
    },
    mounted() {
    },
    destroyed() {
      this.$bus.$off('itemImgLoad', this.itemImgListener)
    }
  }
</script>

<style scoped>
  #detail{ position: relative;z-index: 9;background-color: #FFF;height: 100vh;}
  .detail_nav{ position: relative; z-index: 9; background-color: #FFF;}
  .content{ height: calc(100% - 44px - 49px)}
</style>
