<template>
  <div>
      <mt-header fixed title="Vue project"></mt-header>

      <router-view class="routerViewStyle"></router-view>

      <mt-tabbar>
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

    img{
      width:42px;
      height: 35px;
    }
    .routerViewStyle{
      margin-top: 40px;
    }
</style>

