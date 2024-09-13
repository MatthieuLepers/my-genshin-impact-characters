import { createWebHashHistory, createRouter } from 'vue-router';

import MainView from '@renderer/views/Main/index.vue';
import CharacterListView from '@renderer/views/CharacterList/index.vue';
import ArtefactListView from '@renderer/views/ArtefactList/index.vue';
import WeaponListView from '@renderer/views/WeaponList/index.vue';
import CharacterBuildsView from '@renderer/views/CharacterBuilds/index.vue';

const routes = [
  { path: '/', name: 'Main', component: MainView },
  { path: '/character-list', name: 'CharacterList', component: CharacterListView },
  { path: '/artefact-list', name: 'ArtefactList', component: ArtefactListView },
  { path: '/weapon-list', name: 'WeaponList', component: WeaponListView },
  { path: '/character-builds', name: 'CharacterBuilds', component: CharacterBuildsView },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
