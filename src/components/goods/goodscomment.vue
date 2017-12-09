<template>
  <div>
      <subcomment :commentId="$route.query.goodsId"></subcomment>
  </div>
</template>

<script>
import subcomment from '../subcomponents/subcomment'
export default {
  components:{
      subcomment
  }
}
</script>
