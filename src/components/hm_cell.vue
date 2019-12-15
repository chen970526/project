<template>
  <div class="cell" @click="handlerclick">
    <div class="left">{{title}}</div>
    <div class="right">
      {{type==='password'?"******":desc}}
      <span class="iconfont iconjiantou1"></span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['desc', 'title', 'type'],
  methods: {
    handlerclick (event) {
      this.$emit('click', event)
    }
  }
}
</script>

<style lang='less' scoped>
.cell {
  height: 60 * 100vw/360;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  padding: 0 15px;
  > .right {
    color: #aaa;
    font-size: 13px;
  }
}
</style>
