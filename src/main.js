import Vue from 'vue' //导入第三方
import App from './App.vue' //导入App.vue
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import moment from 'moment'
import VuePreview from 'vue-preview'
import Vuex from 'vuex'

import Mint from 'mint-ui'

import 'mint-ui/lib/style.css'
import './statics/mui/css/mui.css'
import './statics/css/stite.css'

//基于Vue的第三方包，在全局中使用Vue.use()集成进来
Vue.use(Mint);
Vue.use(VueRouter);
Vue.use(VueResource);   //Vue.prototype.$http = VueResource对象
Vue.use(VuePreview); //Vue.$preview
Vue.use(Vuex)   //Vue.$store

//全局过滤器
Vue.filter('fmtDate',(input,formatString)=>{
    const localTime = formatString || 'YYYY-MM-DD HH:mm:ss'
    return moment(input).format(localTime);
})

import home from '@/home/home'
import category from '@/category/category'
import newslist from '@/news/newsList'
import newsinfo from '@/news/newsinfo'
import photolist from '@/photo/photolist'
import photoinfo from '@/photo/photoinfo'
import goodslist from '@/goods/goodslist'
import goodsinfo from '@/goods/goodsinfo'
import goodscomment from '@/goods/goodscomment'
import pictureAndtext from '@/goods/pictureAndtext'
import shopcart from '@/shopcart/shopcart'

//创建路由
const router = new VueRouter ({
    routes :[   
        {path:'/',redirect:'/home'},
        {path:'/home' ,component:home},
        {path:'/category',component:category},
        {path:'/shopcart',component:shopcart},
        {path:'/news/newsList',component:newslist},
        {path:'/news/newsinfo/:newsId',component:newsinfo},
        {path:'/photo/photolist',component:photolist},
        {path:'/photo/photoinfo/:photoId',component:photoinfo},
        {path:'/goods/goodslist',component:goodslist},
        {path:'/goods/goodsinfo/:goodsId',component:goodsinfo},
        {path:'/goods/goodscomment',component:goodscomment},
        {path:'/goods/pictureAndtext/:goodsId',component:pictureAndtext}
    ]
})

//创建仓库
const store = new Vuex.Store({
    state:{
        goodsList:[]
    },
    getters:{
        //返回购物车加入商品的总数
        getGoodstotalCount(state){
            let totalCount = 0
            state.goodsList.forEach(goods=> {
                totalCount += goods.count
            });
            return totalCount   
        },
        //获取购物车中所有的数据
        getGoodsList(state){
            return state.goodsList
        }
    },
    mutations:{
        /**
         * 这个方法，将来是goodsinfo.vue调用的，把商品信息传递过来保存到仓库的goodsList中
         * goods  {goodsId:87,count:3}
         */
        addGoods(state,goods){
            state.goodsList.push(goods)
        },
        //根据商品id删去对应的数据
        deleteGoods(state,goodsId){
            for(var i=state.goodsList.length-1; i>=0; i--){
                const goodsItem = state.goodsList[i]
                if (goodsId == goodsItem.goodsId) {
                    state.goodsList.splice(i,1)
                }
            }
        }

    },
    actions:{
        addGoodAsync(context,goods){
            setTimeout(()=>{
                context.commit('addGoods',goods)
            },2000)
        }
    }

})

//创建根实例
new Vue({
el:'#app',
router,//挂载路由,整个项目就拥有了路由功能
store,//挂载仓库，整个项目就有了仓库，可以往里面存取值
// render:function(createElement){
//     return createElement(App);
// }
render:h=>h(App)
})