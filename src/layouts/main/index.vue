<template>
  <div>
    <div class="Layout__Header">
      <h1>头部</h1>
    </div>
    <div class="Layout__Content">
      <slot> content </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'main-layout',
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.Layout__Header {
  height: 20vh;
  background-color: #2196f3;
  color: white;
}
</style>
