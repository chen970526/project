<template>
  <div class="index">
    <div class="header">
      <span class="iconfont iconnew icon"></span>
      <div class="center">
        <van-icon name="search" />&nbsp;&nbsp;&nbsp;搜索商品
      </div>
      <van-icon name="manager-o" class="icon" @click="jump" />
    </div>
    <van-tabs v-model="active" sticky swipeable>
      <van-tab :title="cate.name" v-for="cate in cateList" :key="cate.id">
        <van-list
          :immediate-check="false"
          :offset="10"
          v-model="cate.loading"
          :finished="cate.finished"
          finished-text="我也是有底线的~"
          @load="onLoad"
        >
          <!-- 下拉刷新 -->
          <van-pull-refresh v-model="cate.isLoading" @refresh="onRefresh">
            <!-- 动态渲染当前栏目的新闻数据 -->
            <articleblock v-for="post in cate.postList" :key="post.id" :post="post"></articleblock>
          </van-pull-refresh>
        </van-list>
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
          pageSize: 5, // 每页的记录数
          loading: false, // 当前栏目更多数据加载状态，默认为不在加载数据
          finished: false, // 数据是否已经完毕加载完毕，默认为没有完毕
          isLoading: false // 标记是否处于下拉刷新的状态，默认为false
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
      // this.cateList[this.active].postList = res.data.data
      this.cateList[this.active].postList.push(...res.data.data)
      // 本次获取了数据之后，将loading重置为false
      this.cateList[this.active].loading = false
      // 重置isLoading,让下拉刷新的提示消失
      this.cateList[this.active].isLoading = false
      // 判断是否数据已经完全加载完毕
      if (res.data.data.length < this.cateList[this.active].pageSize) {
        this.cateList[this.active].finished = true
      }
    },
    onLoad () {
      this.cateList[this.active].pageIndex++
      this.getPostList()
    },
    onRefresh () {
      // console.log(123)
      this.cateList[this.active].pageIndex = 1
      // 重置为False的作用就是让这个栏目可以重新的上拉加载更多数据
      this.cateList[this.active].finished = false
      // 清除数组的所有数据，可以避免反复的创建新的数组
      this.cateList[this.active].postList.length = 0
      // 获取数据
      this.getPostList()
    },
    jump () {
      this.$router.push({
        path: `Personal/${window.localStorage.getItem('heima_40_id')}`
      })
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
