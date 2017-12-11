<template>
  <div>
      <!-- 列表展示 -->
      <div class="shopCartItem">

      </div>
      <!-- 统计 -->
  </div>
</template>

<style scoped>

</style>


<script>
import common from '../../common/common.js'
import { MessageBox } from 'mint-ui'
export default {
    data(){
        return{
            shopCartList:[]
        }
    },
    created(){
        this.getShopCartListData()
    },
    methods:{
        getShopCartListData(){
            //从仓库中取数据
            const goodsList = this.$store.getters.getGoodsList
            if (goodsList==0) {
                return
            }
            //将数据数组变成临时对象
            const tempObj = {}
            goodsList.forEach((goods)=> {
                if(tempObj[goods.goodsId]){
                    tempObj[goods.goodsId] += goods.count  //商品Id相同的数量累加起来
                }else{
                    tempObj[goods.goodsId] = goods.count
                }
            });
            // console.log(tempObj)
            //3.把 {87:5,88:3} 属性名称取出来放在一个临时的数组中 [87,88]
            const tempArray = []
            for(var key in tempObj){
                tempArray.push(key)
            }
            //4.把  [87,88] 变成 87,88 让它符合发送网络请求的需要
            const idsString = tempArray.join(',')
            //5.发送网络请求
            const url = `${common.apihost}api/goods/getshopcarlist/${idsString}`
            this.$http.get(url).then(e=>{
                e.body.message.forEach(item=>{ //把商品数量加到数据中
                    item.count  = tempObj[item.id]
                })
                this.shopCartList = e.body.message
            })

        }
    }
}
</script>
