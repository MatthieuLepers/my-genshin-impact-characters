<template>
  <div :class="GenerateModifiers('ListTab', { scrollable: characterBuildsStore.state.builds.length > 4 })">
    <ul>
      <li v-for="(build, i) in characterBuildsStore.state.builds" :key="i">
        <CharacterBuild :build="build" />
      </li>
    </ul>
  </div>
</template>

<script setup>
import CharacterBuild from '@renderer/components/MyGenshinImpactCharacters/CharacterBuild/index.vue';

import { characterBuildsStore } from '@renderer/core/entities/characterBuild/store';
</script>

<style lang="scss" src="./ListTab.scss">
</style>
