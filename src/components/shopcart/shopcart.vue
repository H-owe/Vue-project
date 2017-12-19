<template>
  <div>
      <!-- 列表展示 -->
      <div class="shopCartItem" v-for="(item,index) in shopCartList" :key="item.id">
          <mt-switch class="switch" v-model="item.select"></mt-switch>

          <div class="thumbImage">
              <img :src="item.thumb_path" alt="">
          </div>
          <div class="content">
            <p>{{item.title}}</p>
            <p><span>{{item.sell_price}}</span>商品数量：{{item.count}}<span></span></p>
          </div>
          
          <mt-button @click="deletegoods(index)" type="danger" size="small" class="delete">删除</mt-button>
      </div>
      <!-- 统计 -->
      <div class="total">   
          <div>
             <h4>总计（不含运费）</h4> 
             <p>已经勾选<span>{{totalCount}}</span>件商品，总价<span>{{totalPrice}}</span>元</p>
          </div>
          
          <mt-button  type="danger"  class="pay">去结算</mt-button>
      </div>
  </div>
</template>

<style scoped>
    .shopCartItem,.total {
        height: 100px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid rgba(92,92,92,0.3);
    }
    .switch {
        margin-left: 5px;
    }
    .thumbImage {
        max-width: 60px;
        height: 60px;
        padding: 3px;
        border: 1px solid #ccc;
        border-radius: 5px;
        margin-left: 5px;
    }
    img {
        width: 100%;
        height: 100%;
    }
    .content {
        flex: 1;
        margin-left: 5px;
        
    }
    .content p {
        margin: 0;
        font-size: 12px;
    }
    .content p:first-child {
        color: #0094ff;
    }
    .content p:last-child {
        display: flex;
        justify-content: space-between;
    }
    .content p span:first-child{
        color: red; 
        font-size: 14px;
        font-weight: 600;
    }
    .delete {
        margin-right: 5px;
    }
    .total {
        background-color: #eee;
        padding-left: 10px;
        justify-content: space-between;
    }
    .total p span {
        color: red;
        font-size: 18px;
    }
    .pay {
        margin-right: 10px;
    }
</style>


<script>
import common from '../../common/common.js'
import { MessageBox } from 'mint-ui'

export default {
    data(){
        return{
            shopCartList:[],
            totalCount:0,
            totalPrice:0
        }
    },
    created(){
        this.getShopCartListData()
    },
    methods:{
        //获取数据
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
                    item.select = true;
                })
                this.shopCartList = e.body.message
                console.log(this.shopCartList)
                this.statistics()
            })
            

        },
        //统计
        statistics(){
            let tempCount = 0;
            let tempPrice = 0;
            this.shopCartList.forEach(item=>{
                if (item.select) {
                    tempCount += item.count
                    tempPrice += item.count*item.sell_price 
                }
            })
            console.log(tempCount)
            this.totalCount = tempCount
            this.totalPrice = tempPrice
        },

        //删除
        deletegoods(index){
            MessageBox.confirm('确定要删除吗？').then(action => {
                const id = this.shopCartList[index].id
                // console.log(id);
                //先删除仓库的数据
                this.$store.commit('deleteGoods',id)
                //删除本组件中选中的那个的数据
                this.shopCartList.splice(index,1);
                //重新渲染
                this.statistics()
                
            },cancel=>{});
        }
    }
    
}
</script>
