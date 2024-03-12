import { createWebHashHistory, createRouter } from 'vue-router';

import MainView from '@renderer/views/Main/index.vue';
import CharacterListView from '@renderer/views/CharacterList/index.vue';

const routes = [
  { path: '/', name: 'Main', component: MainView },
  { path: '/character-list', name: 'CharacterList', component: CharacterListView },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
