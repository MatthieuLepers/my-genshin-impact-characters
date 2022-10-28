import Vue from 'vue';
import VueRouter from 'vue-router';
import MainView from '../views/Main/index';
import CharacterListView from '../views/CharacterList/index';

Vue.use(VueRouter);
export default new VueRouter({
  routes: [
    { path: '/', name: 'Main', component: MainView },
    { path: '/character-list', name: 'CharacterList', component: CharacterListView },
  ],
});
