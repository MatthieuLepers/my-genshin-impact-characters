<template>
  <nav class="PanelMenu" v-if="props.displayIf">
    <button
      v-for="(item, i) in props.data"
      :key="i"
      :class="GenerateModifiers('PanelMenuButton', {
        selected: modelValue === item.id,
      })"
      type="button"
      @click="actions.handleOnClick(item)"
    >
      <slot name="button" :item="item">
        {{ item.label }}
      </slot>
    </button>
  </nav>
</template>

<script setup>
const modelValue = defineModel({ type: [String, Number, Boolean] });

const props = defineProps({
  data: { type: Object, default: () => ({}) },
  displayIf: { type: Boolean, default: true },
});

const actions = {
  handleOnClick(item) {
    modelValue.value = item.id;
    if (typeof item.onClick === 'function') {
      item.onClick();
    }
  },
};
</script>

<style lang="scss" src="./PanelMenu.scss">
</style>
