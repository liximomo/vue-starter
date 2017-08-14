import Vue from 'vue';
import Router from 'vue-router';

// plugin
Vue.use(Router);

Vue.config.productionTip = false;

// suppress unnecessary error logs of vuex
const errorLog = console.error.bind(console);
console.error = (msg, ...rest) => {
  if (msg.indexOf('[vuex] unknown mutation type:') === 0) {
    // swallow up
  } else {
    errorLog(msg, ...rest);
  }
};
