<template>
  <div>
      <!-- 标题部分 -->
      <div class="title">
          <h5>{{PictureAndtextData.title}}</h5>
      </div>
      <!-- 内容 -->
      <div class="content">
          <p v-html="PictureAndtextData.content"></p>
      </div>
  </div>
</template>

<style>
    .title,.content {
        padding: 10px;
        border-bottom: 1px solid #ccc;
    }
    h5 {
        font-size: 16px;
        color: #0094ff;
        font-weight: 600;
        
    }
    
    .gomeImgLoad {
        width: 100%;
    }
    
</style>

<script>
import common from '../../common/common.js'
export default {
  data(){
      return {
          PictureAndtextData:[]
      }
  },
  created(){
      this.getPictureAndtextData()
  },
  methods:{
      getPictureAndtextData(){
          const url = `${common.apihost}api/goods/getdesc/${this.$route.params.goodsId}`
          this.$http.get(url).then(e=>{
              this.PictureAndtextData = e.body.message[0]
              console.log(this.PictureAndtextData)
          })
      }
  }
}
</script>
