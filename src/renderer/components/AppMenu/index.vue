<template>
  <nav class="AppMenu">
    <ul>
      <li>
        <router-link :to="{ name: 'Main' }" class="AppMenuLink">
          <img :src="image(`img/ui/menu_followup.png`)" alt="" />
          {{ t('App.Menu.followup') }}
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'CharacterList' }" class="AppMenuLink">
          <img :src="image(`img/ui/menu_character.png`)" alt="" />
          {{ t('App.Menu.characterBox') }}
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'ArtefactList' }" class="AppMenuLink">
          <img :src="image(`img/ui/menu_artefacts.png`)" alt="" />
          {{ t('App.Menu.artefacts') }}
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'WeaponList' }" class="AppMenuLink">
          <img :src="image(`img/ui/menu_weapons.png`)" alt="" />
          {{ t('App.Menu.weapons') }}
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
