<template>
  <div class="ListTab">
    <ul>
      <li v-for="(build, i) in characterBuildsStore.state.builds" :key="i">
        {{ build.name }}<br />
        Hp: {{ Math.round(build.stats.HP) }}<br />
        Atk: {{ Math.round(build.stats.Atk) }}<br />
        Def: {{ Math.round(build.stats.Def) }}<br />
        EM: {{ Math.round(build.stats.EM) }}<br />
        TC: {{ Math.round(build.stats['CritRate%'] * 10) / 10 }}%<br />
        DC: {{ Math.round(build.stats['CritDmg%'] * 10) / 10 }}%<br />
        ER: {{ Math.round(build.stats['ER%'] * 10) / 10 }}%<br />
      </li>
    </ul>
  </div>
</template>

<script setup>
import { characterBuildsStore } from '@renderer/core/entities/characterBuild/store';
</script>

<style lang="scss" src="./ListTab.scss">
</style>
