<template>
  <div>
      <!-- 标题 -->
      <div class="titleStyle">
          <h4>{{newsInfo.title}}</h4>
          <p>{{newsInfo.add_time | fmtDate}}&nbsp;&nbsp;{{newsInfo.click}}次浏览&nbsp;&nbsp;分类:民生经济</p>
      </div>
      <!-- 内容 -->
      <div class="content">
          <p v-html="newsInfo.content"></p>
      </div>
      <!-- 评论组件 -->
      <subcomment :commentId="this.$route.params.newsId"></subcomment>
  </div>
</template>

<style scoped>
    .titleStyle {
        padding: 10px;
        border-bottom: 1px solid #ccc;
    }
    .titleStyle h4 {
        color: #0094ff;
    }
    .content {
        padding: 10px;
    }
</style>


<script>
import common from '../../common/common.js'

import subcomment from '../subcomponents/subcomment'
export default {
  data(){
      return {
          newsInfo:{}
      }
  },    
  //加载完后调用
  created(){
      this.getInfoData()
  },
  methods:{
      //获取数据
      getInfoData(){
          //url 地址
          const url = common.apihost+"api/getnew/"+this.$route.params.newsId
          console.log(url)
          //get请求获取数据,$http是Vue创建的属性
          this.$http.get(url).then(response=>{
          //接收数据
          this.newsInfo = response.body.message[0]
          console.log(this.newsInfo)
        })
      }
  },
  components:{
      subcomment
  }
}
</script>
