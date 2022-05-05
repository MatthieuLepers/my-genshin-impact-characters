import Vue from 'vue';
import VueRouter from 'vue-router';
import MainView from '../views/Main/index';

Vue.use(VueRouter);
export default new VueRouter({
  routes: [
    { path: '/', name: 'Main', component: MainView },
  ],
});
