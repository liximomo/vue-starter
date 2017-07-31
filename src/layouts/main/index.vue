<template>
  <div class="site">
    <div class="header">
      <h1>头部</h1>
    </div>
    <div class="content">
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
<style scoped>
.header {
  height: 20vh;
  background-color: #2196f3;
  color: white;
}

h1 {
  margin-top: 0;
}
</style>
