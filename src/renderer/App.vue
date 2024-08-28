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

import { notificationStore } from '@renderer/components/Materials/Notification/Store';
import Shortcut from '@renderer/core/Shortcut';

const { t, locale } = useI18n();

api.on('localeChange', (iso) => {
  locale.value = iso;
});

api.on('runShortcut', (shortcut) => {
  if (shortcut in Shortcut) {
    Shortcut[shortcut]();
  }
});

const updateAvailableNotification = {
  type: 'info',
  text: t('App.Updater.downloadingUpdate'),
  delay: 0,
  action: {
    callback() {
      notificationStore.actions.removeNotification(updateAvailableNotification);
    },
    icon: 'icon-close',
  },
};

api.on('update-available', () => {
  notificationStore.actions.pushRawNotification(updateAvailableNotification);
});

api.on('update-downloaded', () => {
  const notification = {
    type: 'success',
    text: t('App.Updater.readyToInstall'),
    delay: 0,
    action: {
      callback() {
        api.sendSync('quitAndInstallUpdate');
      },
      label: t('App.Updater.quitAndInstall'),
      icon: 'icon-export',
    },
  };
  notificationStore.actions.removeNotification(updateAvailableNotification);
  notificationStore.actions.pushRawNotification(notification);
});
</script>

<style lang="scss" src="./assets/styles/style.scss">
</style>
