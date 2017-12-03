<template>
  <div>
      ddd
  </div>
</template>


<script>
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
                const url = "http://vue.studyit.io/api/getnewslist"
                console.log(this)
                this.$http.get(url).then(response=>{
                    this.newsList = response.body.message
                    console.log(this.newsList)
                })
            }
        }
    }
</script>