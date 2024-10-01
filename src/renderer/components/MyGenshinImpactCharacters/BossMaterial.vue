<template>
  <div
    v-if="State.filteredCharacters.length > 0"
    class="BossMaterial"
  >
    <button
      class="BossMaterialTitle"
      @click="State.filteredCharacters.length ? (state.open = !state.open) : null"
    >
      <span>
        <img class="BossMaterialImg" :src="props.material.image" :alt="props.material.id" />
        [{{ actions.getOwnedAndInvestedMaterials(props.material) }}/{{ actions.getMaxMaterial(props.material) }}] {{ props.material.getI18n('name') }}
        <span v-if="filteredCharacterStore.filters.elements.length">&nbsp;({{ State.filteredCharacters.length }})</span>
      </span>
      <FormInput
        class="BossMaterialInventoryInput"
        type="number"
        :min="0"
        :max="9999"
        :label="t('App.inInventory')"
        v-model="props.material.inInventory"
        @click.stop
        @update:modelValue="props.material.save()"
      />
    </button>
    <DataTable
      v-show="state.open && State.filteredCharacters.length"
      :class="{ 'DataTable--Open': state.open }"
      :columns="State.columns"
      :paginate="false"
      :enableActionRow="false"
      :data="State.filteredCharacters"
      :showActionRow="false"
    >
      <template v-slot:nameStr="{ obj }">
        <span :class="['Element', `icon-${obj.element.toLowerCase()}`]" />
        <span :id="obj.name">
          [{{ obj.getInvestedMaterials(props.material.id) }}/{{ obj.getMaxMaterial(props.material.id) }}] {{ obj.nameStr }}
        </span>
      </template>
      <template v-slot:smartLevel="{ obj }">
        <FormInput
          type="number"
          :min="1"
          :max="90"
          v-model="obj.smartLevel"
          @update:modelValue="obj.save()"
        />
      </template>
      <template v-slot:phase="{ obj }">
        <FormInput
          type="number"
          :min="0"
          :max="6"
          v-model="obj.phase"
          @update:modelValue="obj.save()"
        />
      </template>
      <template v-slot:smartConstellation="{ obj }">
        <FormInput
          type="number"
          :min="0"
          :max="6"
          v-model="obj.smartConstellation"
          @update:modelValue="obj.save()"
        />
      </template>
      <template v-slot:aptitudes="{ obj }">
        <FormInput
          type="number"
          :class="{ Bonus: obj.aptitudes.NormalAttack.getBonusValue() > 0 }"
          :min="obj.aptitudes.NormalAttack.getMinLevel()"
          :max="obj.aptitudes.NormalAttack.getMaxLevel()"
          v-model="obj.aptitudes.NormalAttack.smartLevel"
          @update:modelValue="obj.aptitudes.NormalAttack.save()"
        />
        <FormInput
          type="number"
          :class="{ Bonus: obj.aptitudes.ElementalSkill.getBonusValue() > 0 }"
          :min="obj.aptitudes.ElementalSkill.getMinLevel()"
          :max="obj.aptitudes.ElementalSkill.getMaxLevel()"
          v-model="obj.aptitudes.ElementalSkill.smartLevel"
          @update:modelValue="obj.aptitudes.ElementalSkill.save()"
        />
        <FormInput
          type="number"
          :class="{ Bonus: obj.aptitudes.ElementalBurst.getBonusValue() > 0 }"
          :min="obj.aptitudes.ElementalBurst.getMinLevel()"
          :max="obj.aptitudes.ElementalBurst.getMaxLevel()"
          v-model="obj.aptitudes.ElementalBurst.smartLevel"
          @update:modelValue="obj.aptitudes.ElementalBurst.save()"
        />
      </template>
      <template v-slot:spentMora="{ obj }">
        {{ obj.spentMora / 1000 }}k
      </template>
    </DataTable>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue';
import { useI18n } from 'vue-i18n';

import DataTable from '@renderer/components/Materials/DataTable/index.vue';
import FormInput from '@renderer/components/Materials/Form/Input.vue';

import Material from '@renderer/core/entities/material';
import { filteredCharacterStore } from '@renderer/core/stores/FilteredCharacterStore';

const { t } = useI18n();

const props = defineProps({
  material: { type: Material, required: true },
  characters: { type: Array, default: () => [] },
});

const state = reactive({
  open: false,
});

const State = computed(() => ({
  filteredCharacters: props.characters
    .filter((character) => !filteredCharacterStore.filters.elements.length
      || filteredCharacterStore.filters.elements.includes(character.element)),
  columns: {
    nameStr: {
      label: t('App.BossMaterial.columns.character'),
      className: 'flexy__col flexy__col--5of6',
    },
    smartLevel: {
      label: t('App.BossMaterial.columns.level'),
      className: 'flexy__col flexy__col--1of12',
    },
    phase: {
      label: t('App.BossMaterial.columns.phase'),
      className: 'flexy__col flexy__col--1of12',
    },
    smartConstellation: {
      label: t('App.BossMaterial.columns.constellation'),
      className: 'flexy__col flexy__col--1of6',
    },
    aptitudes: {
      label: t('App.BossMaterial.columns.aptitudes'),
      className: 'flexy__col flexy__col--1of3 BossMaterialColumn BossMaterialColumn--Aptitude',
    },
    spentMora: {
      label: t('App.BossMaterial.columns.spentMora'),
      className: 'flexy__col flexy__col--1of6',
    },
  },
}));

const actions = {
  getMaxMaterial(material) {
    return props.characters.reduce((acc, character) => acc + character.getMaxMaterial(material.id), 0);
  },
  getOwnedAndInvestedMaterials(material) {
    return props.characters.reduce((acc, character) => acc + character.getInvestedMaterials(material.id), material.inInventory);
  },
};
</script>

<style lang="scss" src="./BossMaterial.scss">
</style>
