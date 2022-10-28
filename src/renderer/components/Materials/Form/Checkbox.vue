<template>
  <div :class="GenerateModifiers('FormCheckbox', { Focus: focused })">
    <input
      type="checkbox"
      :id="`formCheckbox${_uid}`"
      :value="val"
      :name="name"
      :disabled="disabled"
      :checked="checked"
      @click="handleClick"
      @focus="focused = true"
      @blur="focused = false"
    />
    <label :for="`formCheckbox${_uid}`">{{ label }}</label>
  </div>
</template>

<script>
export default {
  name: 'FormCheckbox',
  props: {
    value: { type: Array, required: true },
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
  computed: {
    checked() {
      return this.value.includes(this.val);
    },
  },
  methods: {
    handleClick(e) {
      this.$emit('click', e, { value: e.target.value, checked: this.checked });
      this.$emit('input', !this.checked ? [...this.value, this.val] : this.value.filter((v) => v !== this.val));
    },
  },
};
</script>

<style lang="scss" src="./Checkbox.scss">
</style>
