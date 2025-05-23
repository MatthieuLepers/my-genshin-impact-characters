<template>
  <AppTitleBar name="main" />
  <AppMenu v-if="!state.loading" />
  <router-view v-if="!state.loading" />
  <div v-else class="MainLoader">
    <MaterialLoaderIcon class="MainLoaderIcon"  />
    <MaterialsProgressBar
      class="MainLoaderProgressBar"
      :percent="state.populate.percent"
      :modifiers="{ center: true }"
    >
      <template #label>
        {{ state.populate.label }} ({{ state.populate.current }}/{{ state.populate.total }})
      </template>
    </MaterialsProgressBar>
  </div>
  <MaterialsNotificationList>
    <template #downloadupdate="{ notification }">
      {{ notification.text }}
      <MaterialsProgressBar
        class="MainProgressBar"
        :percent="state.percent"
      />
    </template>
  </MaterialsNotificationList>
</template>

<script setup>
import { reactive, onBeforeMount } from 'vue';
import { useI18n } from 'vue-i18n';

import AppTitleBar from '@renderer/components/App/TitleBar/index.vue';
import AppMenu from '@renderer/components/App/Menu/index.vue';
import MaterialsProgressBar from '@renderer/components/Materials/ProgressBar/index.vue';
import MaterialsNotificationList from '@renderer/components/Materials/Notification/List.vue';
import MaterialLoaderIcon from '@renderer/components/Materials/Loader/Icon.vue';

import { notificationStore } from '@renderer/components/Materials/Notification/Store';
import { settingsStore } from '@renderer/core/entities/setting/store';
import { materialsStore } from '@renderer/core/entities/material/store';
import { charactersStore } from '@renderer/core/entities/character/store';
import { artefactsStore } from '@renderer/core/entities/artefact/store';
import { artefactPresetsStore } from '@renderer/core/entities/artefactPreset/store';
import { weaponsStore } from '@renderer/core/entities/weapon/store';
import { characterBuildsStore } from '@renderer/core/entities/characterBuild/store';
import Shortcut from '@renderer/core/Shortcut';
import { api } from '@renderer/core/api';

const { t, locale } = useI18n();

const state = reactive({
  loading: true,
  percent: 0,
  populate: {
    label: '',
    current: 0,
    total: 0,
    percent: 0,
  },
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
  id: 'downloadupdate',
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

api.on('download-progress', (percent) => {
  state.percent = percent / 100;
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
    try {
      await settingsStore.actions.load();
      await materialsStore.actions.load();
      await charactersStore.actions.load();
      await artefactsStore.actions.load();
      await artefactPresetsStore.actions.load();
      await weaponsStore.actions.load();
      await characterBuildsStore.actions.load();
    } catch (e) {
      console.log(e);
    }

    await api.invoke('localeChange', settingsStore.actions.getString('locale', 'en-EN'));
    locale.value = settingsStore.actions.getString('locale', 'en-EN');

    state.loading = false;
  });
  api.on('populateProgress', (data) => {
    state.populate = data;
  });

  if (api.isWeb) {
    api.send('database-ready');
  }
});
</script>

<style lang="scss" src="./assets/styles/style.scss">
</style>
