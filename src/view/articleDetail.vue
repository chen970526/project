<template>
  <div class="articaldetail">
    <div class="header">
      <div class="left">
        <van-icon name="arrow-left back" @click="$router.back()" />
        <span class="iconfont iconnew new"></span>
      </div>
      <span
        @click="followThisUser"
        :class="{active:article.has_follow}"
      >{{article.has_follow?'已关注':'关注'}}</span>
    </div>
    <div class="detail">
      <div class="title">{{article.title}}</div>
      <div class="desc">
        <span>{{article.user && article.user.nickname}}</span> &nbsp;&nbsp;
        <span>2019-9-9</span>
      </div>
      <div class="content" v-html="article.content" v-if="article.type === 1"></div>
      <video v-if="article.type === 2" :src="article.content"></video>
      <div class="opt">
        <span class="like" @click="likeThisArticle">
          <van-icon name="good-job-o" />
          {{article.like_length}}
        </span>
        <span class="chat">
          <van-icon name="chat" class="w" />微信
        </span>
      </div>
    </div>
    <!-- 精彩跟帖 -->
    <div class="keeps">
      <h2>精彩跟帖</h2>
      <div class="item" v-for="item in commentList" :key="item.id">
        <div class="head">
          <img :src="item.user.head_img" alt />
          <div>
            <p>{{item.user.nickname}}</p>
            <span>2小时前</span>
          </div>
          <span>回复</span>
        </div>
        <div class="text">{{item.content}}</div>
      </div>
      <div class="more">更多跟帖</div>
    </div>
    <!-- 评论区域 -->
    <hmcommentArea :article="article"></hmcommentArea>
  </div>
</template>
<script>
import {
  getArticleDetail,
  likeArticleById,
  getCommentsById
} from '../api/article.js'
import { unFollowUser, followUser } from '../api/users'
import hmcommentArea from '@/components/hm_commentArea.vue'
export default {
  components: {
    hmcommentArea
  },
  data () {
    return {
      article: {},
      commentList: []
    }
  },
  async mounted () {
    // 根据id获取文章的详情，实现文章详情的动态渲染
    let res = await getArticleDetail(this.$route.params.id)
    console.log(res)
    if (res.status === 200) {
      this.article = res.data.data
      let res2 = await getCommentsById(this.article.id, { pageSize: 10 })
      console.log(res2)
      if (res2.status === 200) {
        this.commentList = res2.data.data.map(value => {
          value.user.head_img =
            localStorage.getItem('hm_40_baseURL') + value.user.head_img
          return value
        })
        console.log(this.commentList)
      }
    }
  },
  methods: {
    async followThisUser () {
      let res
      if (this.article.has_follow === true) {
        res = await unFollowUser(this.article.user.id)
      } else {
        res = await followUser(this.article.user.id)
      }
      // 提示
      this.$toast.success(res.data.message)
      // 修改元素所绑定的数据,实现页面元素效果的刷新
      this.article.has_follow = !this.article.has_follow
    },
    async likeThisArticle () {
      let res1 = await likeArticleById(this.article.user.id)
      console.log(res1)
      this.article.has_like = !this.article.has_like
      this.$toast.success(res1.data.message)
      if (res1.data.message === '点赞成功') {
        this.article.like_length++
      } else if (res1.data.message === '取消成功') {
        this.article.like_length--
      }
    }
  }
}
</script>

<style lang='less' scoped>
.articaldetail {
  padding-bottom: 50px;
}
.header {
  padding: 0px 10px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  > .left {
    height: 100%;
    vertical-align: middle;
    position: relative;
    .van-icon {
      position: absolute;
      top: 15px;
      left: 0;
    }
    > span {
      margin-left: 22px;
      font-size: 50px;
    }
  }
  > span {
    padding: 5px 15px;
    border: 1px solid #ccc;
    color: #333;
    text-align: center;
    border-radius: 15px;
    font-size: 13px;
    &.active {
      color: #fff;
      background-color: #f00;
    }
  }
}
.detail {
  padding: 15px;
  .title {
    font-size: 18px;
    font-weight: bold;
    padding: 10px 0;
  }
  .desc {
    line-height: 30px;
    color: #999;
    font-size: 13px;
  }
  .content {
    text-indent: 2em;
    line-height: 24px;
    font-size: 15px;
    padding-bottom: 30px;
    width: 100%;
  }
  video {
    width: 100%;
    margin-bottom: 10px;
  }
}
.opt {
  display: flex;
  justify-content: space-around;
  .like,
  .chat {
    height: 25px;
    padding: 0 15px;
    font-size: 14px;
    line-height: 25px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 15px;
  }
  .w {
    color: rgb(84, 163, 5);
  }
}
.keeps {
  border-top: 5px solid #ddd;
  padding: 0 15px;
  > h2 {
    line-height: 50px;
    text-align: center;
  }
  .item {
    padding: 10px 0;
    border-bottom: 1px solid #ccc;
    .head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      > img {
        width: 50/360 * 100vw;
        height: 50/360 * 100vw;
        display: block;
        border-radius: 50%;
      }
      > div {
        flex: 1;
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        > span {
          font-size: 12px;
          color: #999;
          line-height: 25px;
        }
      }
      > span {
        color: #999;
        font-size: 13px;
      }
    }
    .text {
      font-size: 14px;
      color: #333;
      padding: 20px 0 10px 0;
    }
  }
  .more {
    width: 100px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 15px;
    margin: 20px auto;
    font-size: 13px;
  }
}
/deep/.photo {
  img {
    width: 100% !important;
    display: block;
  }
}
</style>
