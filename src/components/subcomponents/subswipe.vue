<template>
  <div>
      <mt-swipe :auto="lunbo_time">
        <mt-swipe-item v-for="(item,index) in lunboArray" :key="index">
          <img :src="item.img" alt="">
        </mt-swipe-item>
      </mt-swipe>
  </div>
</template>

<style scoped>
    /* 轮播图样式 */
    .mint-swipe {
        width: 100%;
        height: 250px;
    }
    img{
        width: 100%;
        height: 100%;
    }
</style>

<script>
import common from '../../common/common.js'
export default {
    data(){
        return {
            lunboArray:[]
        }
    },
    props:['lunbo_url','lunbo_time'],
    created(){
        this.getLunboArrayData()
    },
    methods:{
        getLunboArrayData(){
            const url = `${common.apihost}${this.lunbo_url}`
            this.$http.get(url).then(e=>{
                e.body.message.forEach(item=>{
                    if(item.src){
                        item.img = item.src
                    }
                });
                this.lunboArray = e.body.message
                console.log(this.lunboArray)
            })
        }
    }
}
</script>
