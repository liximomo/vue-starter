<template>
  <main-layout>
    <div class="section">
      <img src="./assets/logo.png">
      <router-view></router-view>
    </div>
  </main-layout>
</template>

<script>
import mainLayout from '@/layouts/main';

export default {
  name: 'app',
  components: {
    mainLayout,
  },
};
</script>

<style lang="scss">
@import 'global.scss';

.section {
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}
</style>
