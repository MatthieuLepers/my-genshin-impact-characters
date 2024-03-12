<template>
  <nav class="AppMenu">
    <ul>
      <li>
        <router-link :to="{ name: 'Main' }" class="AppMenuLink">
          <img :src="image(`img/menu_followup.png`)" alt="" />
          {{ t('App.Menu.followup') }}
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'CharacterList' }" class="AppMenuLink">
          <img :src="image(`img/menu_character.png`)" alt="" />
          {{ t('App.Menu.characterBox') }}
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { image } from '@renderer/core/utils';

defineOptions({ name: 'AppMenu' });

const { t } = useI18n();
</script>

<style lang="scss" src="./index.scss">
</style>
