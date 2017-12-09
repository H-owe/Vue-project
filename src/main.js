import Vue from 'vue' //导入第三方
import App from './App.vue' //导入App.vue
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import moment from 'moment'
import VuePreview from 'vue-preview'

import Mint from 'mint-ui'

import 'mint-ui/lib/style.css'
import './statics/mui/css/mui.css'
import './statics/css/stite.css'

Vue.use(Mint);
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(VuePreview);

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

//创建路由
const router = new VueRouter ({
    routes :[
        {path:'/',redirect:'/home'},
        {path:'/home' ,component:home},
        {path:'/category',component:category},
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

new Vue({
el:'#app',
router,
// render:function(createElement){
//     return createElement(App);
// }
render:h=>h(App)
})