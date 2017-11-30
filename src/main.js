import Vue from 'vue' //导入第三方
import App from './App.vue' //导入App.vue

new Vue({
el:'#app',
render:function(createElement){
    return createElement(App);
}
})