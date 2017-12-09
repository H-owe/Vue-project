<template>
  <div>
      <div class="photoNav">
          <ul>
              <li @click="getPhotoListCategoryId(0)">全部</li>
              <li @click="getPhotoListCategoryId(item.id)" v-for="(item,index) in categorylist" :key="index">{{item.title}}</li>
          </ul>
      </div>
      <div class="photoList">
          <ul>
              <li v-for="item in photolist" :key="item.id">
                  <router-link :to="'/photo/photoinfo/'+item.id">
                      <img :src="item.img_url" alt="">
                        <p><span>{{item.title}}</span><br>{{item.zhaiyao}}</p>
                  </router-link>
              </li>
          </ul>
          
      </div>
  </div>
</template>

<style scoped>
    .photoNav {
        overflow-x: auto
    }
    .photoNav ul {
        list-style: none;
        white-space: nowrap;
        margin: 5px 5px;
        padding: 0 0 10px 0;
    }
    .photoNav ul li {
        display: inline-block;
        font-size: 16px;
        margin: 3px;
        color: #0094f6;
    }
    .photoList {
        margin: 5px;
        padding: 0;
    }
    .photoList ul {
        padding: 0 5px;
    }
    .photoList ul li {
        position: relative;
    }
    img {
        width: 100%;
        height: 400px;
    }
    .photoList ul li p {
        position: absolute;
        bottom: 2px;
        color: #fff;
    }
    .photoList ul li p span {
         font-size: 16px;
         font-weight: 700;
         color: rgba(#324324, green, blue, 0.6);
     }
</style>

<script>
import common from '../../common/common.js'
import { Indicator } from 'mint-ui';
export default {
  data(){
      return {
          categorylist:[],
          photolist:[]
      }
  },
  created(){
      this.getPhotoListCategory();
      this.getPhotoListCategoryId(0)
  },
  methods:{
      
      getPhotoListCategory(){
          const url = `${common.apihost}api/getimgcategory`
          this.$http.get(url).then(response=>{
              this.categorylist = response.body.message
              console.log(this.categorylist)
          })
      },
      getPhotoListCategoryId(categoryId){
          const url = `${common.apihost}api/getimages/${categoryId}`
          Indicator.open({
            text: '加载中...',
            spinnerType: 'triple-bounce'
            });
          this.$http.get(url).then(response=>{
               Indicator.close()
              this.photolist = response.body.message
              console.log(this.photolist)
          }).catch(err=>{
              Indicator.close()
          })
      }
  }
}
</script>
