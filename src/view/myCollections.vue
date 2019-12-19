<template>
  <div class="collect">
    <myheader title="我的收藏">
      <span slot="left" class="iconfont iconjiantou2" @click="$router.back()"></span>
    </myheader>
    <div class="list">
      <articleblock v-for="item in collectList" :key="item.id" :post="item"></articleblock>
    </div>
  </div>
</template>
<script>
import myheader from '@/components/hm_header.vue'
import articleblock from '@/components/hm_articleBlock.vue'
import { getMyCollections } from '../api/article'

export default {
  components: {
    myheader,
    articleblock
  },
  data () {
    return {
      collectList: {}
    }
  },
  async mounted () {
    let res = await getMyCollections()
    console.log(res)
  }
}
</script>

<style>
</style>
