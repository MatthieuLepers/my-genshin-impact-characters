<template>
  <button
    v-if="!props.weapon"
    type="button"
    class="weapon-button"
    @click="emit('click', $event)"
  >
    <img :src="image(`img/ui/icon_${props.type}.png`)" alt="" />
    <span>{{ t('App.Artefact.PresetList.formChooseBtnLabel') }}</span>
  </button>
  <div v-else class="weapon-button__card">
    <Weapon
      :weapon="props.weapon"
      :modifiers="props.modifiers"
      @click="emit('click', $event)"
    />
    <ToolTip class="weapon-button__tooltip">
      <ul class="weapon-button__tooltip__sub-stat">
        <li>
          {{ t(`Data.Weapons.${props.weapon.name}.name`) }}
        </li>
        <li>
          <span class="weapon-sub-stat__value">
            <span class="icon-atk" />
            {{ t('App.Artefact.stats.Atk.short') }}
            {{ Math.round(props.weapon.currentAtk) }}
          </span>
        </li>
        <li>
          <span class="weapon-sub-stat__value">
            <span :class="`icon-${formatAffix(props.weapon.statName)}`" />
            {{ t(`App.Artefact.stats.${props.weapon.statName}.short`) }}
            {{ Math.round(props.weapon.currentSubStat * 10) / 10 }}{{ props.weapon.statName.endsWith('%') ? '%' : '' }}
          </span>
        </li>
      </ul>
    </ToolTip>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';

import Weapon from '@renderer/components/MyGenshinImpactCharacters/Weapon/index.vue';
import ToolTip from '@renderer/components/MyGenshinImpactCharacters/ToolTip.vue';

import { image } from '@renderer/core/utils';

defineOptions({ name: 'WeaponButton' });

const { t } = useI18n();
const emit = defineEmits(['click']);
const formatAffix = (val) => val.toLowerCase().replace('%', '');

const props = defineProps({
  type: { type: String, required: true },
  weapon: { type: Object, default: null },
  modifiers: { type: Object, default: () => ({}) },
});
</script>

<style lang="scss" src="./Button.scss">
</style>
