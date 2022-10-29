<template>
  <TitleBar :btnMaximize="false" :btnHelp="false" :appTitle="`My Genshin Impact characters v${appVersion}`">
    <template v-slot:menu>
      <TitleBarMenu :menuList="menuList">
        <template v-slot:fileMenu="{ visible, close }">
          <AppTitleBarFileMenu :visible="visible" @close="close" />
        </template>
        <template v-slot:langMenu="{ visible, close }">
          <AppTitleBarLangMenu :visible="visible" @close="close" />
        </template>
      </TitleBarMenu>
    </template>
  </TitleBar>
</template>

<script>
import TitleBar from '@/components/Materials/TitleBar/index';
import TitleBarMenu from '@/components/Materials/TitleBar/Menu';

import AppTitleBarFileMenu from './FileMenu';
import AppTitleBarLangMenu from './LangMenu';
import { version } from '../../../../package.json';

export default {
  name: 'AppTitleBar',
  components: {
    TitleBar, TitleBarMenu, AppTitleBarFileMenu, AppTitleBarLangMenu,
  },
  computed: {
    menuList() {
      return ['fileMenu', 'langMenu'];
    },
    appVersion() {
      return version;
    },
  },
};
</script>
