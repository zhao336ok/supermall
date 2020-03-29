<template>
  <div>
    <div class="bottom-bar">
      <div class="check-content">
        <check-button class="check-button" :is-checked="isSelectAll" @click.native="checkClick"/>
        <span>全选</span>
      </div>

      <div class="price">
        合计：{{totalPrice}}
      </div>

      <div class="calculate" @click="calClick">
        去计算({{checkLength}})
      </div>
    </div>
  </div>
</template>

<script>
  import CheckButton from "components/content/checkButton/CheckButton";
  import { mapGetters } from "vuex"

  export default {
    name: "CartBottomBar",
    components:{
      CheckButton
    },
    computed:{
      ...mapGetters(['cartList']),
      totalPrice(){
        return '￥' + this.cartList.filter(item=>{
          return item.checked
        }).reduce((preValue, item)=>{
          return preValue + item.price * item.count
        }, 0).toFixed(2)
      },
      checkLength(){
        return this.cartList.filter(item=>item.checked).length
      },
      isSelectAll(){
        if (this.cartList.length === 0) return false;
        return !this.cartList.find(item => !item.checked);
      }
    },
    methods:{
      checkClick(){
        if (this.isSelectAll){//全部选中
          this.cartList.forEach(item => item.checked = false)
        } else {
          this.cartList.forEach(item => item.checked = true)
        }
      },
      calClick(){
        if (!this.isSelectAll){
          this.$toast.show('请选择商品');
        }
      }
    }

  }
</script>

<style scoped>
  .bottom-bar{
    position: relative;
    display: flex;
    height: 40px;
    line-height: 40px;
    background-color: #eee;
  }
  .check-content{
    display: flex;
    align-items: center;
    margin-left: 10px;
    width: 60px;
  }
  .check-button{
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px;
  }
  .price{
    margin-left: 20px;
    flex: 1;
  }
  .calculate{
    text-align: center;
    font-size: 14px;
    color: #FFF;
    width: 90px;
    background-color: red;
  }
</style>
