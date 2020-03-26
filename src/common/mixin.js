import {debounce} from "./utils";
import BackTop from "components/content/backtop/BackTop";
import {BACKTOP_POSITION} from "./const";

export const itemListenerMixin = {
  data(){
    return{
      itemImgListener: null,
      newRefresh: null
    }
  },
  mounted(){
    this.newRefresh = debounce(this.$refs.scroll.refresh, 100);
    this.itemImgListener = () => {
      this.newRefresh()
    }
    this.$bus.$on('itemImgLoad', this.itemImgListener);
  }
};

export const backTopMixin = {
  component:{
    BackTop
  },
  data(){
    return {
      isShowBackTop: false
    }
  },
  methods:{
    backClick(){
      this.$refs.scroll.scrollTo(0, 0, 300);
    },
    listenShowBackTop(position){
      this.isShowBackTop = -position.y > BACKTOP_POSITION;
    }
  }
}
