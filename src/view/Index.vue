<template>
  <div class="index">
    <div class="header">
      <span class="iconfont iconnew icon"></span>
      <div class="center">
        <van-icon name="search" />&nbsp;&nbsp;&nbsp;搜索商品
      </div>
      <van-icon name="manager-o" class="icon" />
    </div>
    <van-tabs v-model="active" sticky swipeable>
      <van-tab :title="cate.name" v-for="cate in cateList" :key="cate.id">
        <articleblock v-for="post in cate.postList" :key="post.id" :post="post"></articleblock>
      </van-tab>
    </van-tabs>
    <div class="newsList"></div>
  </div>
</template>

<script>
import { getArticleList } from '../api/article.js'
import { getCateList } from '../api/cate.js'
import articleblock from '../components/hm_articleBlock.vue'
export default {
  components: {
    articleblock
  },
  data () {
    return {
      active: localStorage.getItem('heima_40_token') ? 1 : 0,
      cateList: []
    }
  },
  async mounted () {
    let res = await getCateList()
    console.log(res)
    if (res.status === 200) {
      this.cateList = res.data.data
      this.cateList = this.cateList.map(value => {
        return {
          ...value, // 保留之前栏目的属性
          postList: [], // 新闻列表，栏目的新闻数据应该存储在这个数组中
          pageIndex: 1, // 页码
          pageSize: 5 // 每页的记录数
        }
      })
      let res1 = await getArticleList({
        pageIndex: this.cateList[this.active].pageIndex,
        pageSize: this.cateList[this.active].pageSize,
        category: this.cateList[this.active].id
      })
      console.log(res1)
      this.cateList[this.active].postList = res1.data.data
    }
  },
  watch: {
    active () {
      if (this.cateList[this.active].postList.length === 0) {
        this.getPostList()
      }
    }
  },
  methods: {
    // 获取栏目的新闻数据
    async getPostList () {
      let res = await getArticleList({
        pageIndex: this.cateList[this.active].pageIndex,
        pageSize: this.cateList[this.active].pageSize,
        category: this.cateList[this.active].id
      })
      console.log(res)
      this.cateList[this.active].postList = res.data.data
    }
  }
}
</script>

<style lang='less' scoped>
.index {
  .header {
    height: 50 * 100vw/360;
    display: flex;
    justify-content: space-between;
    background-color: #f00;
    align-items: center;
    color: #fff;
    .icon {
      font-size: 25px;
      padding: 0 10px;
    }
    .iconnew {
      font-size: 60px;
    }
    .center {
      flex: 1;
      height: 40px;
      line-height: 40px;
      background-color: rgba(255, 255, 255, 0.5);
      text-align: center;
      border-radius: 20px;
    }
  }
}
</style>
