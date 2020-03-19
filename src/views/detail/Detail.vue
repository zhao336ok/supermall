<template>
  <div id="detail">
    <detail-nav-bar class="detail_nav"/>
    <scroll class="content" ref="scroll">
      <detail-swiper :topImages="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info :param-info="paramInfo"/>
    </scroll>
  </div>
</template>

<script>
  import DetailNavBar from "./detailComs/DetailNavBar";
  import DetailSwiper from "./detailComs/DetailSwiper";
  import DetailBaseInfo from "./detailComs/DetailBaseInfo";
  import DetailShopInfo from "./detailComs/DetailShopInfo";
  import DetailGoodsInfo from "./detailComs/DetailGoodsInfo";
  import DetailParamInfo from "./detailComs/DetailParamInfo";

  import Scroll from "components/common/scroll/Scroll";

  import {getDetil, Goods, Shop, GoodsParam} from "network/detail";

  export default {
    name: "Detail",
    components:{
      DetailBaseInfo,
      DetailNavBar,
      DetailSwiper,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      Scroll
    },
    data(){
      return {
        iid: null,
        topImages: null,
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {}
      }
    },
    created() {
      this.iid = this.$route.params.iid

      getDetil(this.iid).then(res=>{
        console.log(res);
        const data = res.result
        //轮播图片
        this.topImages = data.itemInfo.topImages;
        //商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        //店铺信息
        this.shop = new Shop(data.shopInfo)
        //商品详细数据
        this.detailInfo = data.detailInfo;
        //商品属性
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
      })

    },
    methods:{
      imageLoad(){
        this.$refs.scroll.refresh()
      }
    }
  }
</script>

<style scoped>
  #detail{ position: relative;z-index: 9;background-color: #FFF;height: 100vh;}
  .detail_nav{ position: relative; z-index: 9; background-color: #FFF;}
  .content{ height: calc(100% - 44px)}
</style>
