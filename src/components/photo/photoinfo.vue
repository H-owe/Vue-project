<template>
  <div>
      <!-- 标题 -->
      <div class="title">
          <h4>{{photoInfo.title}}</h4>
          <p>{{photoInfo.add_time | fmtDate}}&nbsp;&nbsp;{{photoInfo.click}}次浏览</p>
      </div>

        <!-- 缩略图 -->
      <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li v-for="(item,index) in thumimages" :key="index" class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <img  @click="$preview.open(index, thumimages)" class="preview-img" height="100" :src="item.src" alt="">
            </li>
      </ul>

      <div class="content">
          <p v-html="photoInfo.content"></p>
      </div>
      <!-- 评论子组件 -->
      <subcomment :commentId="this.$route.params.photoId"></subcomment>
  </div>
</template>


<style scoped>
    .title {
        padding: 10px;
    }
    .title h4 {
        font-size: 16px;
        font-weight: 400;
        color: #0094f4;
    }
    .mui-grid-view.mui-grid-9 .mui-table-view-cell {
        padding: 10px;
    }
    img {
        width: 80px;
        height: 80px;
    }
    .content {
        padding: 5px;
    }
</style>

<script>
import common from '../../common/common.js'
import subcomment from '../subcomponents/subcomment'
export default {
  data(){
      return{
          photoInfo:[],
          thumimages:[]
      }
  },
  created(){
      this.getPhotoInfoData();
      this.getThumimagesData()
  },
  methods:{
      getPhotoInfoData(){
          const url = `${common.apihost}api/getimageInfo/${this.$route.params.photoId}`
          this.$http.get(url).then(response=>{
              this.photoInfo = response.body.message[0]
              console.log(this.photoInfo)
          })
      },
      getThumimagesData(){
          const url = `${common.apihost}api/getthumimages/${this.$route.params.photoId}`
          this.$http.get(url).then(response=>{
              response.body.message.forEach(item=> {
                  item.w=400;
                  item.h=400;
              }, this);
              this.thumimages = response.body.message
              console.log(this.thumimages)
          })
      }
  },
  components:{
      subcomment
  }
}
</script>
