<template>
  <div class="BossMaterial">
    <component
      :is="State.filteredCharacters.length ? 'button' : 'div'"
      class="BossMaterialTitle"
      @click="State.filteredCharacters.length ? (state.open = !state.open) : null"
    >
      <span>
        <img class="BossMaterialImg" :src="image(`img/materials/${material}.png`)" :alt="props.material" />
        [{{ actions.getOwnedAndInvestedMaterials(props.material) }}/{{ actions.getMaxMaterial(props.material) }}] {{ t(`Data.WeaklyBosses.${props.boss}.materials.${props.material}`) }}
        <span v-if="useFilteredCharacterStore.filters.elements.length">&nbsp;({{ State.filteredCharacters.length }})</span>
      </span>
      <FormInput type="number" :min="0" :max="9999" v-model="AppStore.data.materials[material]" :label="t('App.inInventory')" @click.stop />
    </component>
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
        <img class="Element" :src="image(`img/elements/${obj.element.toLowerCase()}.png`)" :alt="obj.element" />
        <span :id="obj.name">
          [{{ obj.getInvestedMaterials(props.material) }}/{{ obj.getMaxMaterial(props.material) }}] {{ obj.nameStr }}
        </span>
      </template>
      <template v-slot:smartLevel="{ obj }">
        <FormInput type="number" :min="1" :max="90" v-model="obj.smartLevel" />
      </template>
      <template v-slot:phase="{ obj }">
        <FormInput type="number" :min="0" :max="6" v-model="obj.phase" />
      </template>
      <template v-slot:smartConstellation="{ obj }">
        <FormInput type="number" :min="0" :max="6" v-model="obj.smartConstellation" />
      </template>
      <template v-slot:aptitudes="{ obj }">
        <FormInput type="number"
          :class="{ Bonus: obj.aptitudes.normalAttack.getBonusValue() > 0 }"
          :min="obj.aptitudes.normalAttack.getMinLevel()"
          :max="obj.aptitudes.normalAttack.getMaxLevel()"
          v-model="obj.aptitudes.normalAttack.smartLevel"
        />
        <FormInput type="number"
          :class="{ Bonus: obj.aptitudes.elementalSkill.getBonusValue() > 0 }"
          :min="obj.aptitudes.elementalSkill.getMinLevel()"
          :max="obj.aptitudes.elementalSkill.getMaxLevel()"
          v-model="obj.aptitudes.elementalSkill.smartLevel"
        />
        <FormInput type="number"
          :class="{ Bonus: obj.aptitudes.elementalBurst.getBonusValue() > 0 }"
          :min="obj.aptitudes.elementalBurst.getMinLevel()"
          :max="obj.aptitudes.elementalBurst.getMaxLevel()"
          v-model="obj.aptitudes.elementalBurst.smartLevel"
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

import AppStore from '@renderer/core/stores/AppStore';
import { useFilteredCharacterStore } from '@/renderer/core/stores/FilteredCharacterStore';
import { image } from '@renderer/core/utils';

const { t } = useI18n();

const props = defineProps({
  boss: { type: String, required: true },
  material: { type: String, required: true },
  characters: { type: Array, default: () => [] },
});

const state = reactive({
  open: false,
});

const State = computed(() => ({
  filteredCharacters: props.characters.filter((character) => !useFilteredCharacterStore.filters.elements.length || useFilteredCharacterStore.filters.elements.includes(character.element)),
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
  getMaxMaterial(materialName) {
    return props.characters.reduce((acc, character) => acc + character.getMaxMaterial(materialName), 0);
  },
  getOwnedAndInvestedMaterials(materialName) {
    return props.characters.reduce((acc, character) => acc + character.getInvestedMaterials(materialName), AppStore.data.materials[materialName]);
  },
};
</script>

<style lang="scss" src="./BossMaterial.scss">
</style>
