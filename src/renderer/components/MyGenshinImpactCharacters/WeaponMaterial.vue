<template>
  <div
    v-if="State.filteredWeaponList.length > 0"
    class="WeaponMaterial"
  >
    <button
      class="WeaponMaterialTitle"
      @click="state.open = !state.open"
    >
      <span>
        <img class="WeaponMaterialImg" :src="props.material.getImage(4)" :alt="props.material.id" />
        {{ props.material.getI18n('tier1') }}
      </span>
    </button>
    <WeaponDataTable
      :visible="state.open"
      :data="State.filteredWeaponList"
      @owned="(obj) => emit('owned', obj)"
    />
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue';

import WeaponDataTable from '@renderer/components/MyGenshinImpactCharacters/Weapon/DataTable.vue';

import WeaponMaterial from '@renderer/core/entities/weaponMaterial';
import { weaponsStore } from '@renderer/core/entities/weapon/store';

const props = defineProps({
  material: { type: WeaponMaterial, required: true },
});

const emit = defineEmits(['owned']);

const state = reactive({
  open: false,
});

const State = computed(() => ({
  filteredWeaponList: weaponsStore.actions.applyFilter(weaponsStore.groupedByMaterialWeaponList.value[props.material.id]),
}));
</script>

<style lang="scss" src="./WeaponMaterial.scss">
</style>
