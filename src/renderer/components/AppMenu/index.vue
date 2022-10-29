<template>
  <nav class="AppMenu">
    <ul>
      <li>
        <router-link :to="{ name: 'Main' }" class="AppMenuLink">
          <img src="static/img/menu_followup.png" alt="" />
          {{ $t('App.Menu.followup') }}
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'CharacterList' }" class="AppMenuLink">
          <img src="static/img/menu_character.png" alt="" />
          {{ $t('App.Menu.characterBox') }}
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'AppMenu',
};
</script>

<style lang="scss" src="./index.scss">
</style>
