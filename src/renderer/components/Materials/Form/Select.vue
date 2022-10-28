<template>
  <div :class="GenerateModifiers('FormSelect', { Focus: focused || open, Open: open, Multiple: multiple })" @keydown="handleContainerKeydown">
    <label class="FormSelectLabel" :for="`formSelect${_uid}`" v-if="label">
      {{ label }} <strong v-if="multiple && selectedOptions.length > 0">({{ selectedOptions.length }})</strong>
    </label>
    <select v-if="isGroupable" :name="name" :id="`formSelect${_uid}`" :multiple="multiple" @focus="handleFocus(true, true)" @blur="handleFocus(false, false)">
      <optgroup :label="group" v-for="group in Object.keys(groupedOptions)" :key="group">
        <option :value="option.value" :selected="selectedOptions.includes(option.value)" v-for="(option, i) in groupedOptions[key]" :key="i">
          {{ option.label }}
        </option>
      </optgroup>
    </select>
    <select v-else :name="name" :id="`formSelect${_uid}`" :multiple="multiple" @focus="handleFocus(true, true)" @blur="handleFocus(false, false)">
      <option :value="option.value" :selected="selectedOptions.includes(option.value)" v-for="(option, i) in options" :key="i">
        {{ option.label }}
      </option>
    </select>
    <div class="FormSelectContainer">
      <div class="FormSelectOuter" @click="open = !open">
        <div class="FormSelectOuterItemList">
          <component
            :is="allowRemoveSelected ? 'button' : 'span'"
            type="button"
            :class="GenerateModifiers('FormSelectOuterItem', { NoRemove: !allowRemoveSelected })"
            v-for="(option, i) in selectedOptionList"
            :key="i"
            @click="handleSelectOption(option.value)"
          >
            {{ option.label }}
            <span class="FormSelectOuterItemIcon" aria-hidden="true" v-if="allowRemoveSelected"></span>
          </component>
        </div>
        <span class="FormSelectOuterArrow" aria-hidden="true"></span>
      </div>
      <div v-if="isGroupable" :class="GenerateModifiers('FormSelectDropdown', { [dropdownPosition]: true, Overflowing: isOverflowing })" ref="dropdown">
        <div class="FormSelectDropdownGroup" v-for="group in Object.keys(groupedOptions)" :key="group">
          <div class="FormSelectDropdownGroupLabel">
            <slot name="optgroup" :group="group">{{ group }}</slot>
          </div>
          <component
            :is="allowRemoveSelected ? 'button' : 'div'"
            type="button"
            :class="GenerateModifiers('FormSelectDropdownItem', { Selected: selectedOptions.includes(option.value) })"
            v-for="(option, i) in groupedOptions[group]"
            :key="i"
            @click="handleSelectOption(option.value)"
            :aria-label="allowRemoveSelected ? `Retirer l'option ${option.label}` : null"
          >
            <slot name="option" :option="option" :selected="selectedOptions.includes(option.value)">
              {{ option.label }}
              <span class="FormSelectDropdownItemIcon" aria-hidden="true" v-if="allowRemoveSelected"></span>
            </slot>
          </component>
        </div>
      </div>
      <div v-else :class="GenerateModifiers('FormSelectDropdown', { [dropdownPosition]: true, Overflowing: isOverflowing })" ref="dropdown">
        <component
          :is="allowRemoveSelected ? 'button' : 'div'"
          :class="GenerateModifiers('FormSelectDropdownItem', { Selected: selectedOptions.includes(option.value), Focused: i === fakeIndex })"
          type="button"
          v-for="(option, i) in options"
          :key="i"
          @click="handleSelectOption(option.value)"
        >
          <slot name="option" :option="option" :selected="selectedOptions.includes(option.value)">
            {{ option.label }}
            <span class="FormSelectDropdownItemIcon" aria-hidden="true" v-if="allowRemoveSelected"></span>
          </slot>
        </component>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';

export default {
  name: 'FormSelect',
  props: {
    value: { required: true },
    name: { type: String, default: null },
    label: { type: String, default: null },
    options: { type: Array, default: () => [] },
    inputPlaceholder: { type: String, default: null },
    dropdownPosition: { type: String, default: 'Bottom' },
    allowRemoveSelected: { type: Boolean, default: false },
  },
  data() {
    return {
      selectedOptions: Array.isArray(this.value) ? this.value : [this.value],
      focused: false,
      open: false,
      isOverflowing: false,
      fakeIndex: 0,
    };
  },
  computed: {
    groupedOptions() {
      return this.options.reduce((acc, option) => ({ ...acc, [option.group]: (acc[option.group] || []).concat([option]) }), {});
    },
    isGroupable() {
      return !!this.options.length && this.options.every((option) => !!option.group);
    },
    selectedOptionList() {
      return this.options.filter((option) => this.selectedOptions.includes(option.value));
    },
    multiple() {
      return Array.isArray(this.value);
    },
  },
  methods: {
    handleContainerKeydown(e) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        e.stopPropagation();
        this.fakeIndex = Math.min(this.options.length - 1, this.fakeIndex + 1);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        e.stopPropagation();
        this.fakeIndex = Math.max(0, this.fakeIndex - 1);
      } else if (e.key === ' ') {
        e.preventDefault();
        e.stopPropagation();
        this.handleSelectOption(this.options[this.fakeIndex].value);
      }
    },
    handleSelectOption(optionValue) {
      if (this.selectedOptions.includes(optionValue)) {
        if (this.allowRemoveSelected) {
          this.selectedOptions = this.selectedOptions.filter((val) => val !== optionValue);
        }
      } else {
        this.selectedOptions.push(optionValue);
      }
      this.open = false;

      this.$emit('input', this.multiple ? this.selectedOptions : optionValue);
    },
    handleFocus(focused, open) {
      this.focused = focused;
      this.open = open;
      Vue.nextTick(() => {
        this.isOverflowing = this.$refs.dropdown.offsetHeight - this.$refs.dropdown.scrollHeight < 0;
      });
    },
  },
  watch: {
    value(value) {
      this.selectedOptions = this.multiple ? value : [value];
    },
    open(open) {
      if (open) {
        window.onclick = (e) => {
          if (!e.target.matches('.FormSelectContainer') && !e.target.closest('.FormSelectContainer')) {
            const target = e.target.closest('.FormSelectContainer') || e.target;
            if (target !== this.$el) {
              this.handleFocus(false, false);
              window.onclick = null;
            }
          }
        };
      } else {
        window.onclick = null;
      }
    },
  },
};
</script>

<style lang="scss" src="./Select.scss">
</style>
