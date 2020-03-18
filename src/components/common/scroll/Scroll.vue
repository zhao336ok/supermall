<template>
    <div class="wrapper" ref="wrapper">
      <div class="content">
        <slot></slot>
      </div>
    </div>
</template>

<script>
  import BScroll from "better-scroll"
  export default {
    name: "Scroll",
    data(){
      return{
        scroll: null
      }
    },
    props: {
      probeType:{
        type: Number,
        default: 0
      }
    },
    mounted() {
      //创建scroll对象
      this.scroll = new BScroll(this.$refs.wrapper, {
          click:true,
          probeType:this.probeType
      })
      //监听滚动位置
      this.scroll.on('scroll', (position)=>{
        // console.log(position);
        this.$emit('scroll', position);
      })
      //监听上拉事件
      this.scroll.on('pullingUp', ()=>{
        this.$emit('pullingUp')
      })
    },
    methods:{
      scrollTo(x, y, time){
        this.scroll.scrollTo(x, y, time)
      },
      finishPullUp(){
        this.scroll.finishPullUp()
      }
    }
  }
</script>

<style scoped>

</style>
