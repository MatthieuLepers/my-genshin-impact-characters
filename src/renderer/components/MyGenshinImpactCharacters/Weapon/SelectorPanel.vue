<template>
  <MaterialForm
    :class="GenerateModifiers('weapon-selector-panel', { open: modelValue })"
    @submit.prevent="actions.handleSubmit"
  >
    <div class="weapon-selector-panel__container">
      <ul class="weapon-selector-panel__list">
        <li
          v-for="(weapon, i) in State.weaponList"
          :key="i"
          class="weapon-selector-panel__list-item"
        >
          <Weapon
            :weapon="weapon"
            :selected="weaponsStore.state.current?.id === weapon.id"
            :modifiers="{ tiny: true, checked: form.weapon?.id === weapon.id }"
            @click="weaponsStore.state.current = weapon"
            @dblclick="form.weapon = weapon"
          />
        </li>
      </ul>

      <MaterialFormFieldLine :size="4">
        <template #field2>
          <MaterialButton
            icon="icon-close"
            :modifiers="{ danger: true }"
            @click="modelValue = false"
          >
            {{ t('App.Artefact.PresetList.closeBtnLabel') }}
          </MaterialButton>
        </template>
        <template #field3>
          <MaterialButton
            type="submit"
            icon="icon-check"
            :modifiers="{ success: true }"
            @click="modelValue = false"
          >
            {{ t('App.Artefact.PresetList.confirmBtnLabel') }}
          </MaterialButton>
        </template>
      </MaterialFormFieldLine>
    </div>

    <WeaponDetails
      :showSelect="form.weapon !== weaponsStore.state.current"
      @select="form.weapon = weaponsStore.state.current"
    />
  </MaterialForm>
</template>

<script setup>
import { reactive, computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import MaterialButton from '@renderer/components/Materials/Button/index.vue';
import MaterialForm from '@renderer/components/Materials/Form/index.vue';
import MaterialFormFieldLine from '@renderer/components/Materials/Form/FieldLine.vue';
import Weapon from '@renderer/components/MyGenshinImpactCharacters/Weapon/index.vue';
import WeaponDetails from '@renderer/components/MyGenshinImpactCharacters/Weapon/Details.vue';

import { weaponsStore } from '@renderer/core/entities/weapon/store';

defineOptions({ name: 'WeaponSelectorPanel' });

const { t } = useI18n();
const emit = defineEmits(['submit']);

const modelValue = defineModel({ type: Boolean, default: false });

const props = defineProps({
  formData: { type: Object, default: () => ({}) },
  type: { type: String, default: null },
});

const form = reactive({
  weapon: props.formData.weapon ?? null,
});

const State = computed(() => ({
  weaponList: weaponsStore
    .groupedByTypeWeaponList.value[props.type]
    .filter((weapon) => [80, 90].includes(weapon.level)),
}));

const actions = {
  handleSubmit() {
    emit('submit', { ...form });
    form.weapon = null;
  },
};

watch(() => props.formData.weapon, (newVal) => {
  form.weapon = newVal;
});
</script>

<style lang="scss" src="./SelectorPanel.scss">
</style>
