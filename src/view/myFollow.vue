<template>
  <div class="focus">
    <myheader title="我的关注">
      <span slot="left" class="iconfont iconjiantou2" @click="$router.back()"></span>
    </myheader>
    <div class="list">
      <div class="box" v-for="item in followList" :key="item.id">
        <img :src="item.head_img" alt />
        <div class="center">
          <p>{{item.nickname}}</p>
          <span>2019-9-9</span>
        </div>
        <span @click="unFollow(item.id,index)">取消关注</span>
      </div>
    </div>
  </div>
</template>

<script>
import myheader from '../components/hm_header'
import { getMyFollows, unFollowUser } from '../api/users.js'
export default {
  components: {
    myheader
  },
  data () {
    return {
      followList: []
    }
  },
  async mounted () {
    let res = await getMyFollows()
    console.log(res)
    if (res.status === 200) {
      this.followList = res.data.data
      console.log(this.followList)
      this.followList.map(value => {
        value.head_img = localStorage.getItem('hm_40_baseURL') + value.head_img
      })
    }
  },
  methods: {
    async unFollow (id, index) {
      let res = await unFollowUser(id)
      console.log(res)
      console.log(index)
    }
  }
}
</script>

<style lang='less' scoped>
.list {
  .box {
    display: flex;
    padding: 25px 10px;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ccc;
    > img {
      display: block;
      width: 50/360 * 100vw;
      height: 50/360 * 100vw;
      border-radius: 50%;
      padding: 0 10px;
    }
    > .center {
      flex: 1;
      > p {
        line-height: 30px;
        font-size: 14px;
      }
      > span {
        font-size: 12px;
        color: #999;
      }
    }
    > span {
      height: 30px;
      background-color: #eee;
      font-size: 13px;
      border-radius: 30px;
      line-height: 30px;
      padding: 0px 15px;
    }
  }
}
</style>
