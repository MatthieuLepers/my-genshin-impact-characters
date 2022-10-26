<template>
  <div id="app">
    <AppTitleBar />
    <router-view />
    <NotificationList />
  </div>
</template>

<script>
import { ipcRenderer } from 'electron';
import AppTitleBar from '@/components/AppTitleBar/index';
import NotificationList from '@/components/UI/Notification/List';

export default {
  name: 'App',
  components: { AppTitleBar, NotificationList },
  mounted() {
    ipcRenderer.on('set-locale', (e, iso) => {
      this.$root.$i18n.locale = iso;
    });
  },
};
</script>

<style lang="scss" src="./assets/scss/style.scss">
</style>
