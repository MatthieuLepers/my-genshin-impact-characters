<template>
  <ul class="m-datatable-pagination">
    <li :class="GenerateModifiers('m-datatable-pagination__item', { edge: true, prev: true })">
      <button
        type="button"
        v-if="State.hasPrev"
        @click="modelValue -= 1"
      >
        Prev
      </button>
    </li>
    <li
      v-for="(page, i) in props.data"
      :key="i"
      :class="GenerateModifiers('m-datatable-pagination__item', { current: modelValue === i })"
    >
      <button type="button" @click="modelValue = i">
        {{ i + 1 }}
      </button>
    </li>
    <li :class="GenerateModifiers('m-datatable-pagination__item', { edge: true, next: true })">
      <button
        type="button"
        v-if="State.hasNext"
        @click="modelValue += 1"
      >
        Next
      </button>
    </li>
  </ul>
</template>

<script setup>
import { computed } from 'vue';

defineOptions({ name: 'DataTablePagination' });

const modelValue = defineModel({ type: Number });

const props = defineProps({
  data: { type: Array, required: true },
});

const State = computed(() => ({
  hasPrev: !!props.data[modelValue.value - 1],
  hasNext: !!props.data[modelValue.value + 1],
}));
</script>

<style lang="scss" src="./Pagination.scss">
</style>
