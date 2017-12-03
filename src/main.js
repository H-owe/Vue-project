import Vue from 'vue' //导入第三方
import App from './App.vue' //导入App.vue
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'

import Mint from 'mint-ui'

import 'mint-ui/lib/style.css'
import './statics/mui/css/mui.css'
import './statics/css/stite.css'

Vue.use(Mint);
Vue.use(VueRouter);
Vue.use(VueResource);



import home from '@/home/home'
import category from '@/category/category'
import newslist from '@/news/newsList'

const router = new VueRouter ({
    routes :[
        {path:'/',redirect:'/home'},
        {path:'/home' ,component:home},
        {path:'/category',component:category},
        {path:'/news/newsList',component:newslist}
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