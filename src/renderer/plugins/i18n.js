import Vue from 'vue';
import VueI18n from 'vue-i18n';
import I18N from '../i18n/index';

Vue.use(VueI18n);
export default new VueI18n({
  locale: 'fr-FR',
  messages: I18N,
});
