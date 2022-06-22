<template>
  <div class="Filters">
    <ul class="FiltersElementList">
      <li v-for="element in elementList" :key="element" :class="GenerateModifiers('FiltersElement', { Active: filterElements.includes(element) })">
        <button @click="handleClickElement(element)">
          <img :src="`static/img/elements/${element.toLowerCase()}.png`" :alt="element" />
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import AppStore from '@/js/stores/AppStore';

const ELEMENTS_ORDER = ['Pyro', 'Hydro', 'Anemo', 'Electro', 'Dendro', 'Cryo', 'Geo'];

export default {
  name: 'Filters',
  methods: {
    handleClickElement(element) {
      if (AppStore.filters.elements.includes(element)) {
        AppStore.filters.elements = AppStore.filters.elements.filter((e) => e !== element);
      } else {
        AppStore.filters.elements.push(element);
      }
    },
  },
  computed: {
    elementList() {
      return Object
        .values(AppStore.data.characters)
        .map((character) => character.element)
        .filter((character, i, arr) => arr.indexOf(character) === i)
        .sort((a, b) => ELEMENTS_ORDER.indexOf(a) - ELEMENTS_ORDER.indexOf(b))
      ;
    },
    filterElements() {
      return AppStore.filters.elements;
    },
  },
};
</script>

<style lang="scss" src="./Filters.scss">
</style>
