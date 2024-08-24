<template>
  <Form :class="GenerateModifiers('Filters', { Simple: props.simple })">
    <FormFieldLine :size="simple ? 1 : 3">
      <ul class="FiltersElementList">
        <li v-for="element in State.elementList" :key="element" :class="GenerateModifiers('FiltersElement', { Active: filteredCharacterStore.filters.elements.includes(element) })">
          <button type="button" @click="actions.handleClickElement(element)">
            <img :src="image(`img/elements/${element.toLowerCase()}.png`)" :alt="element" />
          </button>
        </li>
      </ul>
      <label v-if="!props.simple" class="FormSelectLabel">
        {{ t('App.Filters.element.label') }}
      </label>
      <template v-slot:field0>
        <ul class="FiltersElementList">
          <li v-for="element in State.elementList" :key="element" :class="GenerateModifiers('FiltersElement', { Active: filteredCharacterStore.filters.elements.includes(element) })">
            <button type="button" @click="actions.handleClickElement(element)">
              <img :src="image(`img/elements/${element.toLowerCase()}.png`)" :alt="element" />
            </button>
          </li>
        </ul>
        <label v-if="!props.simple" class="FormSelectLabel">
          {{ t('App.Filters.element.label') }}
        </label>
      </template>
      <template v-slot:field1>
        <FormInput
          v-model="filteredCharacterStore.filters.name"
          class="FiltersSearch"
          :label="t('App.Filters.search.label')"
        />
      </template>
      <template v-slot:field2>
        <FormSelect
          v-model="filteredCharacterStore.sortBy.text"
          class="FiltersSelect"
          :options="State.sortOptions"
          :label="t('App.Filters.sort.label')"
        />
      </template>
    </FormFieldLine>
  </Form>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import Form from '@renderer/components/Materials/Form/index.vue';
import FormFieldLine from '@renderer/components/Materials/Form/FieldLine.vue';
import FormInput from '@renderer/components/Materials/Form/Input.vue';
import FormSelect from '@renderer/components/Materials/Form/Select.vue';

import { charactersStore } from '@renderer/core/entities/character/store';
import { filteredCharacterStore } from '@/renderer/core/stores/FilteredCharacterStore';
import { image } from '@renderer/core/utils';

const { t } = useI18n();

const ELEMENTS_ORDER = ['Pyro', 'Hydro', 'Anemo', 'Electro', 'Dendro', 'Cryo', 'Geo'];

const props = defineProps({
  simple: { type: Boolean, default: true },
  ownerFilter: { type: Boolean, default: true },
});

const State = computed(() => ({
  elementList: Object
    .values(charactersStore.state.characters)
    .filter((character) => !props.ownerFilter || (props.ownerFilter && character.owned))
    .map((character) => character.element)
    .filter((character, i, arr) => arr.indexOf(character) === i)
    .sort((a, b) => ELEMENTS_ORDER.indexOf(a) - ELEMENTS_ORDER.indexOf(b)),
  sortOptions: [
    { value: 'releasedAt:asc', label: t('App.Filters.sort.releasedAt.asc') },
    { value: 'releasedAt:desc', label: t('App.Filters.sort.releasedAt.desc') },
    { value: 'name:asc', label: t('App.Filters.sort.name.asc') },
    { value: 'name:desc', label: t('App.Filters.sort.name.desc') },
    { value: 'element:asc', label: t('App.Filters.sort.element.asc') },
  ],
}));

const actions = {
  handleClickElement(element) {
    if (filteredCharacterStore.filters.elements.includes(element)) {
      filteredCharacterStore.filters.elements = filteredCharacterStore.filters.elements.filter((e) => e !== element);
    } else {
      filteredCharacterStore.filters.elements.push(element);
    }
  },
};
</script>

<style lang="scss" src="./Filters.scss">
</style>
