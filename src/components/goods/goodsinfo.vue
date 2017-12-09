<template>
  <div>
      <!-- 轮播图组件 -->
      <div class="lunbotu">
          <subswipe :lunbo_url="'api/getthumimages/'+this.$route.params.goodsId" :lunbo_time="2000"></subswipe>
      </div>
      <!-- 2.0 商品信息 -->
        <div class="goodsInfo">
            <h5>{{goodsInfo.title}}</h5>
            <p>市场价：<del>&yen;{{goodsInfo.market_price}}</del>&nbsp;&nbsp;销售价：&yen;<span>{{goodsInfo.sell_price}}</span></p>

            <subnumber v-on:countChange="getSubNumberCount" v-if="goodsInfo.stock_quantity"></subnumber>

            <mt-button type="primary">立即购买</mt-button>
            <mt-button @click="addShopCart()" type="danger">加入购物车</mt-button>
        </div>
      <!-- 3.0 商品参数 -->
        <div class="goodsParams">
            <h6>商品参数</h6>
            <ul>
                <li>商品货号：{{goodsInfo.goods_no}}</li>
                <li>库存情况：剩余{{goodsInfo.stock_quantity}}件</li>
                <li>上架时间：{{goodsInfo.add_time | fmtDate}}</li>
            </ul>
        </div>
      <!-- 4.0 图文介绍&商品评论 -->
      <div class="pictureAndtext">
          <mt-button @click="goToPictureAndText()" type="primary" plain size="large">图文介绍</mt-button>
          <mt-button @click="goToGoodsComment()" class="comment" type="danger" plain size="large">商品评论  </mt-button>
      </div>    
  </div>
</template>

<style scoped>
    .lunbotu,.goodsParams,.goodsInfo,.pictureAndtext {
        margin: 10px;
        border: 1px solid rgba(92, 92, 92, 0.3);
        border-radius: 5px;
        padding: 6px;
    }
    h5,h6 {
       border-bottom: 1px solid rgba(92, 92, 92, 0.3);
       padding-bottom: 8px;
       padding-left: 5px;
    }
    h5 {
        color: #0094ff;
        font-size: 16px;
    }
    .goodsParams ul{
        list-style: none;
        margin-left: 5px;
        padding-left: 0;
        font-size: 14px;
    }
   .goodsInfo p span {
       color: red;
   }
   .pictureAndtext .comment{
       margin-top: 10px;
   }
</style>

<script>
import common from '../../common/common.js'
import subswipe from '../subcomponents/subswipe'
import subnumber from '../subcomponents/subnumber'
import {Toast} from 'mint-ui'
import bus from '../../common/commonvue.js'

export default {
  data(){
      return{
          goodsInfo:[],
          goodscount:1
      }
  },

  created(){
      this. getGoodsInfoData()
  },
  methods:{
      //获取商品详情数据
      getGoodsInfoData(){
          const url = `${common.apihost}api/goods/getinfo/${this.$route.params.goodsId}`
          this.$http.get(url).then(response=>{
              this.goodsInfo = response.body.message[0]
              console.log(this.goodsInfo)
          })
      },
      //跳转到图文介绍
      goToPictureAndText(){
          this.$router.push({path:`/goods/pictureAndText/${this.$route.params.goodsId}`})
          
      },
      //跳转到商品评论
      goToGoodsComment(){
          this.$router.push({path:`/goods/goodscomment`,query:{goodsId: this.$route.params.goodsId}})
      },
      //接收子组件传来的值
      getSubNumberCount(count){
          this.goodscount = count
      },
      //把值加到购物车
      addShopCart(){
          Toast({
                    message: '加入购物车成功',
                    position: 'middle',
                    duration: 2000
               });
            bus.$emit('countChange',this.goodscount)
      }

  },
  components:{
      subswipe,
      subnumber
  }
}
</script>
