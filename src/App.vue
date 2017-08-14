<template>
  <main-layout>
    <div class="Section">
      <img src="./assets/logo.png">
    </div>
    <div class="Section">
      <h1>Welcome to Your Vue.js App</h1>
      <h2>Pages</h2>
      <ul>
        <li>
          <router-link :to="path.home()">home</router-link>
        </li>
        <li>
          <router-link :to="path.about()">about</router-link>
        </li>
      </ul>
    </div>
    <div>
      <router-view></router-view>
    </div>
  </main-layout>
</template>

<script>
import mainLayout from '@/layouts/Main';

export default {
  name: 'app',
  inject: ['path'],
  components: {
    mainLayout,
  },
};
</script>

<style lang="scss">
@import 'global.scss';

.Section {
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}
</style>
