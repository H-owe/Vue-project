<template>
  <div>
      <div @click="minus()" class="left">-</div>
      <div class="middle">{{pay}}</div>
      <div @click="add()" class="right">+</div>
  </div>
</template>

<style scoped>
    .left,.middle,.right{
       display: inline-block;
       border: 1px solid rgba(92, 92, 92, 0.3);
       width: 35px;
       height: 35px;
       text-align: center;
       line-height: 35px;
       margin-bottom: 6px;
   }

   .middle{
       width: 40px;
   }
</style>

<script>
import common from '../../common/common.js'
export default {
  props:['stock_quantity'],
  data(){
      return {
          count:1
      }
  },
  created(){

  },
  methods:{
      //减法
      minus(){
          if (this.count <=1) {
              return
          }
          this.count--;
          this.notify()
      },
      //加法
      add(){
          if (this.count >=this.stock_quantity) {
              return
          }
          this.count++;
          this.notify()
      },
      //通知父组件，子组件内部现在的值是多少
      notify(){
          //发送就是触发事件，然后传值
          this.$emit('countChange',this.count)
      }
  },
  computed:{
      pay:function(){
          if (this.count==1) {
              return this.count=2
          }
      }
  }

}
</script>
