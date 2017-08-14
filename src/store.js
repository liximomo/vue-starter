import Vue from 'vue';
import Vuex from 'vuex';

import user from './modules/user';
import createfluxAction, { createPlugin } from './lib/vuex-flux-action';

Vue.use(Vuex);

const FLUX_ACTION = 'FLUX_ACTION';
const store = new Vuex.Store({
  strict: true,
  plugins: [
    // add dispatchApi method to store
    createPlugin(FLUX_ACTION),
  ],
  modules: {
    user,
    // chatroom,
  },
  actions: {
    [FLUX_ACTION]: createfluxAction(FLUX_ACTION),
  },
});

if (process.env.NODE_ENV === 'development') {
  window.store = store;
}

export default store;
