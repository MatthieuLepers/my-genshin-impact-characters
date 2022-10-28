<template>
  <div :class="GenerateModifiers('FormRadio', { Focus: focused })">
    <input
      type="radio"
      :id="`formRadio${_uid}`"
      :value="val"
      :name="name"
      :disabled="disabled"
      :checked="value === val"
      @click="$emit('input', val)"
      @focus="focused = true"
      @blur="focused = false"
    />
    <label :for="`formRadio${_uid}`">{{ label }}</label>
  </div>
</template>

<script>
export default {
  name: 'FormRadio',
  props: {
    value: { type: [String, Number, Boolean], required: true },
    val: { type: [String, Number, Boolean], required: true },
    name: { type: String, default: null },
    label: { type: String, required: true },
    disabled: { type: Boolean, default: false },
  },
  data() {
    return {
      focused: false,
    };
  },
};
</script>

<style lang="scss" src="./Radio.scss">
</style>
