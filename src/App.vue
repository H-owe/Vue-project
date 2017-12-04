<template>
  <div>
      <mt-header fixed title="Vue project"></mt-header>
      <div @click="goback" v-show="isshow" class="back">&lt;返回</div>


      <router-view class="routerViewStyle"></router-view>

      <mt-tabbar fixed :class="tabbarShow ? '':'tabbar'">
        <mt-tab-item>
          <router-link to="/home">
            <img  src="http://img08.jiuxian.com/bill/2016/0224/cccd8df26a754c139de800406af82178.png">
          </router-link>
        </mt-tab-item>
        <mt-tab-item>
          <router-link to="/category">
            <img  src="http://img07.jiuxian.com/bill/2016/0224/36a49b28ec5e4cdf9dbe37988199487d.png">
          </router-link>
        </mt-tab-item>
        <mt-tab-item>
        <img  src="http://img08.jiuxian.com/bill/2016/0224/42baf46987b6460bb43b3396e9941653.png">
 
        </mt-tab-item>
        <mt-tab-item>
        <img  src="http://img09.jiuxian.com/bill/2016/0224/cba9029a8f4444a989a2ab5aa84c6538.png">

        </mt-tab-item>
      </mt-tabbar>
  </div>
</template>

<style scoped>
    .mint-tabbar > .mint-tab-item.is-selected{
       background-color: #fafafa;
    }
    .back {
      position: fixed;
      top: 10px;
      left: 10px;
      z-index: 2;
      color: #fff;
      font-size: 14px;
    }

    img{
      width:42px;
      height: 35px;
    }
    .routerViewStyle{
      margin-top: 40px;
    }
    .tabbar {
      display: none;
    }
</style>

<script>
  export default{
    data(){
      return{
        isshow:false
      }
    },
    //重新加载后判断url
    created(){
      this.isShow(this.$route.path)
    },
    methods: {
      goback(){
        this.$router.go(-1)
      },
      isShow(path){
        if (path !='/home') {
          this.isshow = true
          this.tabbarShow = false
        } else {
          this.isshow = false;
          this.tabbarShow = true
        }
      }
      
    },
    watch:{
      /**
       * 属性:要监控的对象
       * 值:处理函数
         $route只有路由发生变化,才会触发
       */
      /*
          es5
          $route:function(newValue,oldValue){
            console.log(newValue)
          }
      */
       
      $route(newValue,oldValue){
        this.isShow(newValue.path)
      } 
    }
  }
</script>
