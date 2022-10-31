<template>
  <div class="BossMaterial" v-if="filteredCharacters.length">
    <button class="BossMaterialTitle" @click="open = !open">
      <span>
        <img class="BossMaterialImg" :src="`static/img/materials/${material}.png`" :alt="material" />
        [{{ getOwnedAndInvestedMaterials(material) }}/{{ getMaxMaterial(material) }}] {{ $t(`Data.WeaklyBosses.${boss}.materials.${material}`) }}
        <span v-if="filters.elements.length">&nbsp;({{ filteredCharacters.length }})</span>
      </span>
      <FormInput type="number" :min="0" :max="9999" v-model="AppStore.data.materials[material]" :label="$t('App.inInventory')" @click.stop />
    </button>
    <DataTable
      v-show="open"
      :class="{ 'DataTable--Open': open }"
      :columns="columns"
      :paginate="false"
      :enableActionRow="false"
      :data="filteredCharacters"
    >
      <template v-slot:nameStr="props">
        <img class="Element" :src="`static/img/elements/${props.obj.element.toLowerCase()}.png`" :alt="props.obj.element" />
        <span :id="props.obj.name">
          [{{ props.obj.getInvestedMaterials(material) }}/{{ props.obj.getMaxMaterial(material) }}] {{ props.obj.nameStr }} <span class="Beta" v-if="props.obj.beta">(Beta)</span>
        </span>
      </template>
      <template v-slot:smartLevel="props">
        <FormInput type="number" :min="1" :max="90" v-model="props.obj.smartLevel" />
      </template>
      <template v-slot:phase="props">
        <FormInput type="number" :min="0" :max="6" v-model="props.obj.phase" />
      </template>
      <template v-slot:constellations="props">
        <FormInput type="number" :min="0" :max="6" v-model="props.obj.constellations" />
      </template>
      <template v-slot:aptitudes="props">
        <FormInput type="number"
          :class="{ Bonus: props.obj.aptitudes.normalAttack.getBonusValue() > 0 }"
          :min="props.obj.aptitudes.normalAttack.getMinLevel()"
          :max="props.obj.aptitudes.normalAttack.getMaxLevel()"
          v-model="props.obj.aptitudes.normalAttack.smartLevel"
        />
        <FormInput type="number"
          :class="{ Bonus: props.obj.aptitudes.elementalSkill.getBonusValue() > 0 }"
          :min="props.obj.aptitudes.elementalSkill.getMinLevel()"
          :max="props.obj.aptitudes.elementalSkill.getMaxLevel()"
          v-model="props.obj.aptitudes.elementalSkill.smartLevel"
        />
        <FormInput type="number"
          :class="{ Bonus: props.obj.aptitudes.elementalBurst.getBonusValue() > 0 }"
          :min="props.obj.aptitudes.elementalBurst.getMinLevel()"
          :max="props.obj.aptitudes.elementalBurst.getMaxLevel()"
          v-model="props.obj.aptitudes.elementalBurst.smartLevel"
        />
      </template>
      <template v-slot:spentMora="props">
        {{ props.obj.spentMora / 1000 }}k
      </template>
    </DataTable>
  </div>
</template>

<script>
import DataTable from '@/components/Materials/DataTable/index';
import FormInput from '@/components/Materials/Form/Input';
import AppStore from '@/assets/js/stores/AppStore';

export default {
  name: 'BossMaterial',
  components: { DataTable, FormInput },
  props: {
    boss: { type: String, required: true },
    material: { type: String, required: true },
    characters: { type: Array, default: () => [] },
    filters: { type: Object, required: true },
  },
  data() {
    return {
      AppStore,
      open: false,
    };
  },
  methods: {
    getMaxMaterial(materialName) {
      return this.characters.reduce((acc, character) => acc + character.getMaxMaterial(materialName), 0);
    },
    getOwnedAndInvestedMaterials(materialName) {
      return this.characters.reduce((acc, character) => acc + character.getInvestedMaterials(materialName), AppStore.data.materials[materialName]);
    },
  },
  computed: {
    filteredCharacters() {
      return this.characters
        .filter((character) => !this.filters.elements.length || this.filters.elements.includes(character.element))
      ;
    },
    columns() {
      return {
        nameStr: {
          label: this.$t('App.BossMaterial.columns.character'),
          className: 'col-xs-10',
        },
        smartLevel: {
          label: this.$t('App.BossMaterial.columns.level'),
          className: 'col-xs-1',
        },
        phase: {
          label: this.$t('App.BossMaterial.columns.phase'),
          className: 'col-xs-1',
        },
        constellations: {
          label: this.$t('App.BossMaterial.columns.constellation'),
          className: 'col-xs-2',
        },
        aptitudes: {
          label: this.$t('App.BossMaterial.columns.aptitudes'),
          className: 'col-xs-8 BossMaterialColumn BossMaterialColumn--Aptitude',
        },
        spentMora: {
          label: this.$t('App.BossMaterial.columns.spentMora'),
          className: 'col-xs-2',
        },
      };
    },
  },
};
</script>

<style lang="scss" src="./BossMaterial.scss">
</style>
