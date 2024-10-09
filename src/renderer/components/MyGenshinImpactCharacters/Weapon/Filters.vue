<template>
  <MaterialForm class="weapon-filters">
    <MaterialFormFieldLine>
      <MaterialFormInput
        v-model="weaponsStore.state.filters.search"
        label="Rechercher"
        :iconData="{ icon: 'icon-close', clickable: true }"
        @icon="weaponsStore.state.filters.search = ''"
      />
    </MaterialFormFieldLine>
  </MaterialForm>
</template>

<script setup>
import MaterialForm from '@renderer/components/Materials/Form/index.vue';
import MaterialFormFieldLine from '@renderer/components/Materials/Form/FieldLine.vue';
import MaterialFormInput from '@renderer/components/Materials/Form/Input.vue';

import { weaponsStore } from '@renderer/core/entities/weapon/store';
</script>

<style lang="scss" src="./Filters.scss">
</style>
