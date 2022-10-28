<template>
  <div class="FormFileSelector">
    <input
      class="FormFileSelectorInput"
      type="file"
      :multiple="multiple"
      :name="name"
      @change="$emit('input', Array.from($event.target.files))"
    />
    <Button
      class="FormFileSelectorButton"
      type="button"
      :disabled="disabled"
      icon="icon-import"
      @click.stop="handleClick"
    >
      {{ label }}
    </Button>
  </div>
</template>

<script>
import Button from '../Button/index';

export default {
  name: 'FormFileSelector',
  components: { Button },
  props: {
    value: { type: [Array, String], required: true },
    multiple: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    label: { type: String, default: null },
    name: { type: String, default: null },
  },
  methods: {
    handleClick() {
      this.$el.querySelector('.FormFileSelectorInput').click();
    },
  },
};
</script>

<style lang="scss" src="./FileSelector.scss">
</style>
