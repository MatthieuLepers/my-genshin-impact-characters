<template>
  <AppTitleBar name="main" />
  <AppMenu />
  <router-view />
  <NotificationList />
</template>

<script setup>
import { useI18n } from 'vue-i18n';

import AppTitleBar from '@renderer/components/AppTitleBar/index.vue';
import AppMenu from '@renderer/components/AppMenu/index.vue';
import NotificationList from '@renderer/components/Materials/Notification/List.vue';

import Shortcut from '@renderer/core/Shortcut';

const { locale } = useI18n();

api.on('localeChange', (iso) => {
  locale.value = iso;
});

api.on('runShortcut', (shortcut) => {
  if (shortcut in Shortcut) {
    Shortcut[shortcut]();
  }
});
</script>

<style lang="scss" src="./assets/styles/style.scss">
</style>
