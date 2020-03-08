import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('views/home/Home')
const Cate = () => import('views/cate/Cate')
const Cart = () => import('views/cart/Cart')
const ProFile = () => import('views/profile/ProFile')

//安装插件
Vue.use(VueRouter)

const routes =[
  {
    path:'',
    redirect:'/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/cate',
    component: Cate
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/profile',
    component: ProFile
  }
]

//创建router
const router = new VueRouter({
  routes,
  mode: 'history'
})

//导出router
export default router
