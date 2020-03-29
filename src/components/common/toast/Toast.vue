<template>
    <div class="toast" v-show="isShow">
      <div>{{message}}</div>
    </div>
</template>

<script>
  export default {
    name: "Toast",
    data() {
      return {
        message: '',
        isShow: false
      }
    },
    methods:{
      show(messages='提示文字', timers=2000){
        this.message = messages;
        this.isShow = true;
        setTimeout(()=>{
          this.message = '';
          this.isShow = false;
        }, timers);
      }
    }
  }
</script>

<style scoped>
  .toast{
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 999;
    background-color: rgb(0, 0, 0, 0.5);
    transform: translate(-50%, 50%);
    color: #FFF;
    padding: 8px 10px;
    border-radius: 10px;
  }
</style>
