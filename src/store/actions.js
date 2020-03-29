import {
  ADD_COUNTER,
  ADD_TO_CAR
} from './mutations-types';
export default {
  addCart(context, payload){
    return new Promise((resolve) => {
      //查找之前数组中是否有该商品
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid);
      //判断oldProduct
      if (oldProduct){//商品数量加 1
        // oldProduct.count += 1;
        context.commit(ADD_COUNTER, oldProduct);
        resolve('当前商品数量+1')
      }else{ //添加新产品
        payload.count = 1;
        context.commit(ADD_TO_CAR, payload);
        resolve('添加了新的产品')
      }
    })
  }
}
