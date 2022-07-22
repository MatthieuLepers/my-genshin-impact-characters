import 'regenerator-runtime/runtime';
import Vue from 'vue';

import App from './App';
import i18n from './plugins/i18n';
import router from './plugins/router';
import GenerateModifiers from './plugins/GenerateModifiers';

// eslint-disable-next-line global-require
if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
Vue.config.productionTip = false;
Vue.use(GenerateModifiers);

/* eslint-disable no-new */
new Vue({
  components: { App },
  template: '<App/>',
  i18n,
  router,
}).$mount('#app');