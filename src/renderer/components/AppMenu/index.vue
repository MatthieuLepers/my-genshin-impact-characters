<template>
  <nav class="AppMenu">
    <ul>
      <li>
        <router-link :to="{ name: 'Main' }">
          Suivi de mes personnages
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'CharacterList' }">
          Ma boite de personnages
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
