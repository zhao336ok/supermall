<template>
    <div class="recommend">
      <div class="recommend-item" v-for="item in recommends" :key="item.id">
        <a :href="item.link" target="_blank">
          <img :src="item.image" alt="">
          <p>{{item.title}}</p>
        </a>
      </div>
    </div>
</template>

<script>
    export default {
      name: "RecommendView",
      props:{
        recommends:{
          type:Array,
          default(){
            return[]
          }
        }
      }
    }
</script>

<style scoped>
  .recommend{ display: flex; padding: 10px 0px 25px; border-bottom: 8px solid #eee;}
  .recommend-item{ flex: 1; text-align: center; font-size: 13px;}
  .recommend-item img{
    padding-bottom: 10px;
    width: 75px;}
</style>
