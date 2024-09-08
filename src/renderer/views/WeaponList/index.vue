<template>
  <main class="View WeaponListView">
    <h1 class="WeaponListViewTitle">
      {{ t('App.myWeapons') }}
    </h1>
  </main>
</template>

<script setup>
import { useI18n } from 'vue-i18n';

defineOptions({ name: 'WeaponListView' });

const { t } = useI18n();
</script>

<style lang="scss" src="./index.scss">
</style>
