<template>
  <AppTitleBar name="main" />
  <AppMenu v-if="!state.loading" />
  <router-view v-if="!state.loading" />
  <MaterialLoaderIcon v-else class="MainLoader" />
  <NotificationList />
</template>

<script setup>
import { reactive, onBeforeMount } from 'vue';
import { useI18n } from 'vue-i18n';

import AppTitleBar from '@renderer/components/AppTitleBar/index.vue';
import AppMenu from '@renderer/components/AppMenu/index.vue';
import NotificationList from '@renderer/components/Materials/Notification/List.vue';
import MaterialLoaderIcon from '@renderer/components/Materials/Loader/Icon.vue';

import { notificationStore } from '@renderer/components/Materials/Notification/Store';
import { settingsStore } from '@renderer/core/entities/setting/store';
import { materialsStore } from '@renderer/core/entities/material/store';
import { charactersStore } from '@renderer/core/entities/character/store';
import { artefactSetsStore } from '@renderer/core/entities/artefactSet/store';
import { artefactsStore } from '@renderer/core/entities/artefact/store';
import { artefactPresetsStore } from '@renderer/core/entities/artefactPreset/store';
import { weaponsStore } from '@renderer/core/entities/weapon/store';
import { characterBuildsStore } from '@renderer/core/entities/characterBuild/store';
import Shortcut from '@renderer/core/Shortcut';

const { t, locale } = useI18n();

const state = reactive({
  loading: true,
});

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

onBeforeMount(() => {
  api.on('database-ready', async () => {
    await settingsStore.actions.load();
    await materialsStore.actions.load();
    await charactersStore.actions.load();
    await artefactSetsStore.actions.load();
    await artefactsStore.actions.load();
    await artefactPresetsStore.actions.load();
    await weaponsStore.actions.load();
    await characterBuildsStore.actions.load();

    await api.invoke('localeChange', settingsStore.actions.getString('locale'));
    locale.value = settingsStore.actions.getString('locale');

    state.loading = false;
  });
});
</script>

<style lang="scss" src="./assets/styles/style.scss">
</style>
