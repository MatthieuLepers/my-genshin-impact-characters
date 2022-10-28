<template>
  <div id="app">
    <AppTitleBar />
    <AppMenu />
    <router-view />
    <NotificationList />
  </div>
</template>

<script>
import { ipcRenderer } from 'electron';
import AppTitleBar from '@/components/AppTitleBar/index';
import AppMenu from '@/components/AppMenu/index';
import NotificationList from '@/components/Materials/Notification/List';

export default {
  name: 'App',
  components: { AppTitleBar, AppMenu, NotificationList },
  mounted() {
    ipcRenderer.on('set-locale', (e, iso) => {
      this.$root.$i18n.locale = iso;
    });
  },
};
</script>

<style lang="scss" src="./assets/scss/style.scss">
</style>
