<template>
  <AppTitleBar name="main" />
  <AppMenu v-if="!state.loading" />
  <router-view v-if="!state.loading" />
  <MaterialLoaderIcon v-else />
  <NotificationList />
</template>

<script setup>
import { reactive, onBeforeMount } from 'vue';
import { useI18n } from 'vue-i18n';

import AppTitleBar from '@renderer/components/AppTitleBar/index.vue';
import AppMenu from '@renderer/components/AppMenu/index.vue';
import NotificationList from '@renderer/components/Materials/Notification/List.vue';
import MaterialLoaderIcon from '@renderer/components/Materials/Loader/Icon.vue';

import { settingsStore } from '@renderer/core/entities/setting/store';
import { materialsStore } from '@renderer/core/entities/material/store';
import { charactersStore } from '@renderer/core/entities/character/store';
import Shortcut from '@renderer/core/Shortcut';

const { locale } = useI18n();

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

onBeforeMount(() => {
  api.on('database-ready', async () => {
    await settingsStore.actions.load();
    await materialsStore.actions.load();
    await charactersStore.actions.load();

    await api.invoke('localeChange', settingsStore.actions.getString('locale'));
    locale.value = settingsStore.actions.getString('locale');

    state.loading = false;
  });
});
</script>

<style lang="scss" src="./assets/styles/style.scss">
</style>
