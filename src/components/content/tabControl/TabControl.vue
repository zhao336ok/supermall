<template>
    <div class="tab-control">
      <div class="tab-item"
           v-for="(item, index) in titles"
           @click="itemClick(index)"
           :class="{active: selIndex === index}"
           :key="index"
      ><span>{{item}}</span>
      </div>
    </div>
</template>

<script>
    export default {
      name: "TabControl",
      props:{
        titles:{
          type:Array,
          default(){
            return []
          }
        }
      },
      data(){
        return{
          selIndex:0
        }
      },
      methods:{
        itemClick(index){
          this.selIndex = index
          this.$emit('tabClick', index)
        }
      }
    }
</script>

<style scoped>
  .tab-control{display: flex; text-align: center;}
  .tab-item{ flex: 1; height: 40px;
    line-height: 40px;}
  .active{ color: var(--color-high-text);}
  .active span{ border-bottom: 2px solid var(--color-tint); padding-bottom: 5px;}
</style>
