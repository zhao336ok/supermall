<template>
  <div id="detail-nav-bar">
    <nav-bar>
      <div class="back" slot="left" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div class="title" slot="center">
        <div class="title-item" v-for="(item, index) in titles" :class="{active: selIndex == index}" @click="titleClick(index)" :key="index">{{item}}</div>
      </div>
    </nav-bar>

  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  export default {
    name: "DetailNavBar",
    components:{
      NavBar
    },
    data(){
      return {
        titles:['详情', '参数', '评论', '推荐'],
        selIndex: 0
      }
    },
    methods:{
      titleClick(index){
        this.selIndex = index;
        this.$emit('titleClick', index);
      },
      backClick(){
        this.$router.back()
      }
    }
  }
</script>

<style scoped>
  .title{ display: flex}
  .title-item{ flex: 1; font-size: 13px;}
  .back img{
    margin-top: 12px;}
  .active{ color: var(--color-high-text)}
</style>
