<template>
  <Form :class="GenerateModifiers('Filters', { Simple: simple })">
    <FormFieldLine :size="simple ? 1 : 3">
      <template v-slot:field0>
        <ul class="FiltersElementList">
          <li v-for="element in elementList" :key="element" :class="GenerateModifiers('FiltersElement', { Active: store.filters.elements.includes(element) })">
            <button type="button" @click="handleClickElement(element)">
              <img :src="`static/img/elements/${element.toLowerCase()}.png`" :alt="element" />
            </button>
          </li>
        </ul>
        <label v-if="!simple" class="FormSelectLabel">{{ $t('App.Filters.element.label') }}</label>
      </template>
      <template v-slot:field1>
        <FormInput
          v-model="store.filters.name"
          class="FiltersSearch"
          :label="$t('App.Filters.search.label')"
        />
      </template>
      <template v-slot:field2>
        <FormSelect
          v-model="store.sortBy"
          class="FiltersSelect"
          :options="sortOptions"
          :label="$t('App.Filters.sort.label')"
        />
      </template>
    </FormFieldLine>
  </Form>
</template>

<script>
import Form from '@/components/Materials/Form/index';
import FormFieldLine from '@/components/Materials/Form/FieldLine';
import FormInput from '@/components/Materials/Form/Input';
import FormSelect from '@/components/Materials/Form/Select';
import AppStore from '@/assets/js/stores/AppStore';

const ELEMENTS_ORDER = ['Pyro', 'Hydro', 'Anemo', 'Electro', 'Dendro', 'Cryo', 'Geo'];

export default {
  name: 'Filters',
  components: { Form, FormFieldLine, FormInput, FormSelect },
  props: {
    simple: { type: Boolean, default: true },
    ownerFilter: { type: Boolean, default: true },
    store: { type: Object, required: true },
  },
  methods: {
    handleClickElement(element) {
      if (this.store.filters.elements.includes(element)) {
        this.store.filters.elements = this.store.filters.elements.filter((e) => e !== element);
      } else {
        this.store.filters.elements.push(element);
      }
    },
  },
  computed: {
    elementList() {
      return Object
        .values(AppStore.data.characters)
        .filter((character) => !this.ownerFilter || (this.ownerFilter && character.owned))
        .map((character) => character.element)
        .filter((character, i, arr) => arr.indexOf(character) === i)
        .sort((a, b) => ELEMENTS_ORDER.indexOf(a) - ELEMENTS_ORDER.indexOf(b))
      ;
    },
    sortOptions() {
      return [
        { value: 'releasedAt:asc', label: this.$t('App.Filters.sort.releasedAt.asc') },
        { value: 'releasedAt:desc', label: this.$t('App.Filters.sort.releasedAt.desc') },
        { value: 'name:asc', label: this.$t('App.Filters.sort.name.asc') },
        { value: 'name:desc', label: this.$t('App.Filters.sort.name.desc') },
        { value: 'element:asc', label: this.$t('App.Filters.sort.element.asc') },
      ];
    },
  },
};
</script>

<style lang="scss" src="./Filters.scss">
</style>
