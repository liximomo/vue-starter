// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';

import './config';
import App from './App';
import store from './store';
import routes from './routes';
import createRouter from './router';
import * as path from './path';

const router = createRouter(routes, store);

/* eslint-disable no-new */
new Vue({
  router,
  store,
  el: '#app',
  render(h) {
    return h('app');
  },
  components: { App },
  // 依赖提供器 提供全局对象供子组件访问
  provide: {
    path,
  },
});
