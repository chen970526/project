<template>
  <!-- <div class="login">
    登陆

  </div>-->
  <div id="app">
    <div class="container">
      <div class="close">
        <span class="iconfont iconicon-test"></span>
      </div>
      <div class="logo">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="inputs">
        <!-- <input  placeholder="请输入手机号" class="input" /> -->
        <hminput></hminput>
        <!-- <input placeholder="密码" class="input" type="password" /> -->
          <hminput></hminput>
      </div>
      <p class="tips">
        没有账号？
        <a href="#/register" class>去注册</a>
      </p>
      <hmbutton text="登陆" @click="login"></hmbutton>
    </div>
  </div>
</template>

<script>
import hminput from '@/components/hm_input.vue'
import hmbutton from '@/components/hm_button.vue'
export default {
  components: {
    hmbutton, hminput
  },
  methods: {
    login () {
      this.$toast.fail(this.msg_err)
    }
  }
}
</script>

<style lang='less' scoped>
.container {
  padding: 20px;
}

.close {
  span {
    font-size: 27 / 360 * 100vw;
  }
}

.logo {
  display: flex;
  justify-content: center;

  span {
    display: block;
    font-size: 126 / 360 * 100vw;
    color: #d81e06;
  }
}

.inputs {
  input {
    margin-bottom: 20px;
  }
}

.tips {
  text-align: right;
  margin-bottom: 20px;

  a {
    color: #3385ff;
  }
}
</style>
