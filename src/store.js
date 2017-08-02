import Vue from 'vue';
import Vuex from 'vuex';

import user from './modules/user';
import apiAction, { plug2Store } from './lib/vuex-api-action';

Vue.use(Vuex);

const API_ACTION = 'API_ACTION';
const store = new Vuex.Store({
  strict: true,
  modules: {
    user,
  },
  actions: {
    [API_ACTION]: apiAction,
  },
});

// add dispatchApi method to store
plug2Store(store, API_ACTION);

if (process.env.NODE_ENV === 'development') {
  window.store = store;
}

export default store;
