<template>
  <div>
      <div class="postComment">
          <h4>提交评论</h4>
          <textarea name="" ref="textAreaRef" id="" cols="20" rows="5"></textarea>
          <mt-button  @click="postComment()" type="primary" size="large">提交评论</mt-button>
      </div>

      <div class="commentList">
          <h4>评论列表</h4>
          <div v-for="(item,index) in commentList":key="index" class="commentItem">
              <p>{{item.content}}</p>
              <p><span>{{item.user_name}}</span><span>{{item.add_time | before}}</span></p>
          </div>
          <mt-button @click="loadmore()" class="loadMore" type="danger" plain size="large">加载更多</mt-button>
      </div>
      
  </div>
</template>

<style scoped>
    .postComment {
        padding: 10px;
    }
    .commentList {
        padding: 10px;

    }
    .commentList h4 {
        border-bottom: 1px solid #ccc;
        padding-bottom: 10px;
    }
    .commentItem {
        height: 100px;
        overflow-y: auto;
        border-bottom: 1px solid #ccc;
    }
    .commentItem p:first-child {
        margin-top: 10px;
        min-height: 45px;
        color: #333;
    }
    .commentItem p:last-child {
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        color: #0094ff;
    }   
    .loadMore {
        margin-top: 10px;
        /* margin-bottom: 10px; */
    }
</style>


<script>
import moment from 'moment'
import common from '../../common/common.js'
import {Toast} from 'mint-ui'
export default {
  data(){
      return {
          commentList:[],
          pageIndex:1,
          comment:''
      }
  },

  props:['commentId'],

  created(){
     
      this.getCommentListData()
  },
  filters:{
      before:function(input){
          moment.locale('zh-cn')
          return moment(input).startOf('second').fromNow();
      }
  },
  methods:{
      getCommentListData(){
          
          const url = common.apihost+"api/getcomments/"+this.commentId+"?pageindex="+this.pageIndex
          console.log(url)
          this.$http.get(url).then(response=>{
             if(this.pageIndex==1){
                 this.commentList = response.body.message
             }else{
                 this.commentList = this.commentList.concat(response.body.message)
             }
          })
      },
      //加载更多
      loadmore(){
          this.pageIndex++
          this.getCommentListData()
      },
      //提交评论
      postComment(){
          //获取评论内容
        
            const content = this.$refs.textAreaRef.value
          const url = common.apihost+"api/postcomment/"+this.commentId
          this.$http.post(url,{content:content},{emulateJSON:true}).then(response=>{
              //清空textarea中的内容
              this.$refs.textAreaRef.value = ''
              //提示用户
            Toast({
                message: response.body.message,
                position: 'middle',
                duration: 3000
            });
            //重新加载第一页
            this.pageIndex = 1;
            this.getCommentListData()
          })
      }
  }
  
}
</script>
