<template>
  <main-layout>
    <div class="section">
      <img src="./assets/logo.png">
    </div>
    <div class="section">
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
import mainLayout from '@/layouts/main';

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
</style>

<style lang="scss" scoped>
.section {
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
