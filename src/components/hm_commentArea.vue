<template>
  <div class="comment">
    <div class="addcomment" v-show="!isFocus">
      <input type="text" placeholder="写跟帖" @focus="handlerFocus" />
      <span class="comment">
        <i class="iconfont iconpinglun-"></i>
        <em>100</em>
      </span>
      <i
        class="iconfont iconshoucang"
        :class="{active:article.has_star}"
        @click="collectThisArticle"
      ></i>
      <i class="iconfont iconfenxiang"></i>
    </div>
    <div class="inputcomment" v-show="isFocus">
      <textarea ref="commtext" rows="5"></textarea>
      <div>
        <span>发送</span>
        <span @click="isFocus=false">取消</span>
      </div>
    </div>
  </div>
</template>

<script>
import { collectArticleById } from '../api/article.js'
export default {
  props: ['article'],
  data () {
    return {
      isFocus: false
    }
  },
  methods: {
    handlerFocus () {},
    async collectThisArticle () {
      let res = await collectArticleById(this.article.id)
      //   console.log(res)
      this.$toast.success(res.data.message)
      this.article.has_star = !this.article.has_star
    }
  }
}
</script>
<style lang='less' scoped>
.comment {
  position: fixed;
  bottom: 0;
  left: 0;
}
.inputcomment {
  padding: 10px;
  box-sizing: border-box;
  width: 100vw;
  display: flex;
  background-color: #fff;
  align-items: flex-end;
  textarea {
    flex: 3;
    background-color: #eee;
    border: none;
    border-radius: 10px;
    padding: 10px;
  }
  div {
    padding: 20px;
  }
  span {
    display: block;
    flex: 1;
    height: 24px;
    line-height: 24px;
    padding: 0 10px;
    background-color: #f00;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    font-size: 13px;
  }
}
.addcomment {
  width: 100vw;
  box-sizing: border-box;
  padding: 10px;
  margin-top: 20px;
  display: flex;
  text-align: center;
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: #fff;
  border-top: 1px solid #ddd;
  .active {
    color: red;
  }
  > input {
    flex: 4;
    height: 30px;
    line-height: 30px;
    border-radius: 15px;
    border: none;
    background-color: #eee;
    padding-left: 20px;
    font-size: 14px;
  }
  i {
    font-size: 20px;
  }
  > span {
    flex: 1;
    position: relative;
    > em {
      position: absolute;
      right: 0;
      top: -5px;
      font-size: 10px;
      background-color: #f00;
      color: #fff;
      border-radius: 5px;
      padding: 3px 5px;
    }
  }
  > i {
    flex: 1;
  }
}
</style>
