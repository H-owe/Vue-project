<template>
  <div>
      <ul class="mui-table-view">
				<li v-for="item in newsList" :key="item.id" class="mui-table-view-cell mui-media">
                    <router-link :to="'/news/newsinfo/'+item.id">
					
						<img class="mui-media-object mui-pull-left" :src="item.img_url">
						<div class="mui-media-body">
							<p class="title">{{item.title}}</p>
							<p class='mui-ellipsis'><span>点击量:{{item.click}}</span> <span>{{item.add_time | fmtDate('YYYY-MM-DD HH:mm')}}</span></p>
						</div>
					</router-link>
				</li>
		</ul>
  </div>
</template>


<script>
    import common from '../../common/common.js'

    export default {
        data(){
            return{
                newsList:[]
            }
        },
        created(){
            this.getNewsListData()
        },
        methods:{
            getNewsListData(){
                const url = common.apihost+"api/getnewslist"
                console.log(this)
                this.$http.get(url).then(response=>{
                    this.newsList = response.body.message
                    console.log(this.newsList)
                })
            }
        }
    }
</script>

<style scoped>
    .mui-table-view {
        margin-bottom: 50px;
    }
    .mui-table-view-cell {
        height: 90px;
    }
    .mui-media-object {
        max-width: 65px;
        height: 65px;
    }
    img {
        width: 100%;
        height: 100%;
    }
    .title {
        color: gray;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        min-height: 45px;
    }
    .mui-ellipsis  {
        color: #0094ff;
        display: flex;
        font-size: 12px;
        justify-content: space-between;
    }
</style>
