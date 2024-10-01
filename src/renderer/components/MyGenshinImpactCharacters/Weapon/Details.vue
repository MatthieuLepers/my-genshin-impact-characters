<template>
  <aside
    v-if="weaponsStore.state.current"
    class="weapon-details"
  >
    <div>
      <div :class="GenerateModifiers('weapon-details__header', {
        [`gradient${weaponsStore.state.current.rarity}`]: true,
      })">
        <span class="weapon-details__header-name">
          <img :src="image(`img/ui/icon_${weaponsStore.state.current.type}.png`)" alt="" />
          <strong>
            {{ weaponsStore.state.current.getI18n('name') }}
          </strong>
        </span>
        <span class="weapon-details__level">
          Lv. {{ weaponsStore.state.current.level }}
        </span>
        <span class="weapon-details__rank">
          R{{ weaponsStore.state.current.rank }}
        </span>
        <span class="weapon-details__rarity">
          {{ [...Array(weaponsStore.state.current.rarity).keys()].reduce((acc) => `${acc}★`, '') }}
        </span>
        <img :src="weaponsStore.state.current.image" alt="" />
      </div>
      <ul class="weapon-details__stat-list">
        <li>
          <span class="icon-atk">
            {{ t('App.Artefact.stats.Atk.short') }}
          </span>
          {{ round('Atk', weaponsStore.state.current.currentAtk) }}
        </li>
        <li>
          <span :class="`icon-${formatAffix(weaponsStore.state.current.statName)}`">
            {{ t(`App.Artefact.stats.${weaponsStore.state.current.statName}.short`) }}
          </span>
          {{ round(weaponsStore.state.current.statName, weaponsStore.state.current.currentSubStat) }}{{ weaponsStore.state.current.statName.endsWith('%') ? '%' : '' }}
        </li>
      </ul>
    </div>

    <div
      v-if="props.showSelect"
      class="weapon-details__buttons"
    >
      <MaterialButton
        type="button"
        icon="icon-check"
        :modifiers="{ success: true }"
        @click="emit('select')"
      >
        {{ t('App.Artefact.List.selectBtnLabel') }}
      </MaterialButton>
    </div>
  </aside>
</template>

<script setup>
import { useI18n } from 'vue-i18n';

import MaterialButton from '@renderer/components/Materials/Button/index.vue';

import { image } from '@renderer/core/utils';
import { weaponsStore } from '@renderer/core/entities/weapon/store';
import { round } from '@renderer/core/entities/artefact/StatUtils';

defineOptions({ name: 'WeaponDetails' });

const { t } = useI18n();
const emit = defineEmits(['select', 'edit']);
const formatAffix = (val) => val.toLowerCase().replace('%', '');

const props = defineProps({
  showSelect: { type: Boolean, default: false },
});
</script>

<style lang="scss" src="./Details.scss">
</style>
