<template>
  <input type="text" class="inp" />
</template>

<script>
export default {}
</script>

<style lang='less' scoped>
.inp {
  width: 314 * 100vw/360;
  height: 40 * 100vw/360;
  border: none;
  outline: none;
  border-bottom: 2px solid rgb(117, 117, 117);
  font-size: 18px;
  margin: 5px 0;
  background-color: transparent;
}
.error {
  border-bottom-color: red;
}
.success {
  border-bottom-color: green;
}
</style>
