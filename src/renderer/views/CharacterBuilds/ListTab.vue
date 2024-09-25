<template>
  <div class="ListTab">
    <ul>
      <li v-for="(build, i) in characterBuildsStore.state.builds" :key="i">
        {{ build.name }}<br />
        Hp: {{ build.stats.HP }}<br />
        Atk: {{ build.stats.Atk }}<br />
        Def: {{ build.stats.Def }}<br />
        EM: {{ build.stats.EM }}<br />
        TC: {{ build.stats['CritRate%'] }}%<br />
        DC: {{ build.stats['CritDmg%'] }}%<br />
        ER: {{ build.stats['ER%'] }}%<br />
      </li>
    </ul>
  </div>
</template>

<script setup>
import { characterBuildsStore } from '@renderer/core/entities/characterBuild/store';

console.log(characterBuildsStore.state.builds);
</script>

<style lang="scss" src="./ListTab.scss">
</style>
