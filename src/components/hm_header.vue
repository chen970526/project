<template>
  <div class="header">
    <span>
      <slot name="left"></slot>
    </span>
    <span class="title">{{title}}</span>
    <span>
      <slot name="rignt"></slot>
    </span>
  </div>
</template>

<script>
export default {
  props: ['title']
}
</script>

<style lang='less' scoped>
.header {
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  height: 46 * 100vw/360;
  border-bottom: 1px solid #ccc;
  align-items: center;
  box-sizing: border-box;
  .title {
    font-weight: 700;
  }
}
</style>
