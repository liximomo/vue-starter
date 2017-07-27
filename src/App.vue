<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
};
</script>

<style lang="scss">
@import "variables";
@import "theme/desktop";
@import "mixins";
@import "base/reset";
@import "base/base";
@import "utlis";
@import "module/avatar";
@import "module/badge";
@import "module/button";
@import "module/icon";
@import "module/link";
@import "module/modal";
@import "module/placeholder";
@import "module/share";
@import "module/text";

html {
  height: 100%;
  font-size: 16px;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', Arial, sans-serif;
  font-size: 16px;
  line-height: $line-height-base;
  background: $body-background-color;
  color: #333;
  position: relative;
  min-height: 100%;
  color: rgba(0,0,0,.8);
  -webkit-font-smoothing: subpixel-antialiased;
}

::-webkit-scrollbar {
  height: 10px;
  width: 10px;
  overflow: visible;
}

::-webkit-scrollbar-button {
  height: 0;
  width: 0;
}

::-webkit-scrollbar-track {
  background-clip: padding-box;
  border: solid transparent;
  border-width: 0;
}

::-webkit-scrollbar-track:horizontal {
  border-width: 0;
}

::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.2);
  min-height: 28px;
  padding: 20px 0 0;
  box-shadow: inset 1px 1px 0 rgba(0, 0, 0, 0.1), inset 0 -1px 0 rgba(0, 0, 0, 0.07);
}

::-webkit-scrollbar-thumb:hover {
  background-color: rgba(0, 0, 0, 0.4);
  box-shadow: inset 1px 1px 1px rgba(0, 0, 0, 0.25);
}

::-webkit-scrollbar-thumb:horizontal {
  border-width: 6px 1px 1px;
  padding: 0 0 0 100px;
  box-shadow: inset 1px 1px 0 rgba(0, 0, 0, 0.1), inset -1px 0 0 rgba(0, 0, 0, 0.07);
}

::-webkit-scrollbar-corner {
  background: transparent;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
