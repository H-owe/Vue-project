import Vue from 'vue' //导入第三方
import App from './App.vue' //导入App.vue
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import moment from 'moment'

import Mint from 'mint-ui'

import 'mint-ui/lib/style.css'
import './statics/mui/css/mui.css'
import './statics/css/stite.css'

Vue.use(Mint);
Vue.use(VueRouter);
Vue.use(VueResource);

//全局过滤器
Vue.filter('fmtData',(input,formatString)=>{
    const localTime = formatString || 'YYY-MM-DD HH:mm:ss'
    return moment(input).format(localTime);
})

import home from '@/home/home'
import category from '@/category/category'
import newslist from '@/news/newsList'
import newsinfo from '@/news/newsinfo'


//创建路由
const router = new VueRouter ({
    routes :[
        {path:'/',redirect:'/home'},
        {path:'/home' ,component:home},
        {path:'/category',component:category},
        {path:'/news/newsList',component:newslist},
        {path:'/news/newsinfo/:newsId',component:newsinfo}
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