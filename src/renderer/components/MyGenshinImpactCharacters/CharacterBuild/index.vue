<template>
  <div
    type="button"
    class="character-build"
  >
    <div class="character-build__container">
      <img
        :src="props.build.character.getImage('theme')"
        class="character-build__theme"
        alt=""
      />
      <img
        :src="props.build.character.getImage('icon')"
        class="character-build__img"
        alt=""
      />
      <div class="character-build__infos">
        <h2 :class="GenerateModifiers('character-build__name', { [props.build.character.element.toLowerCase()]: true })">
          {{ props.build.name }}
        </h2>
        <span class="character-build__level">
          Lvl {{ props.build.character.level }}

          <span :class="GenerateModifiers('character-build__constellation', {
            common: props.build.character.constellation <= 3,
            uncommon: props.build.character.constellation === 4,
            rare: props.build.character.constellation === 5,
            epic: props.build.character.constellation === 6,
          })">
            <strong>C{{ props.build.character.constellation }}</strong>
          </span>
        </span>
        <div class="character-build__aptitudes">
          <span :class="GenerateModifiers('character-build__aptitudes-item', { rare: props.build.character.aptitudes.NormalAttack.getBonusValue() > 0 })">
            {{ props.build.character.aptitudes.NormalAttack.level }}
          </span>
          <span :class="GenerateModifiers('character-build__aptitudes-item', { rare: props.build.character.aptitudes.ElementalSkill.getBonusValue() > 0 })">
            {{ props.build.character.aptitudes.ElementalSkill.level }}
          </span>
          <span :class="GenerateModifiers('character-build__aptitudes-item', { rare: props.build.character.aptitudes.ElementalBurst.getBonusValue() > 0 })">
            {{ props.build.character.aptitudes.ElementalBurst.level }}
          </span>
        </div>
        <div class="character-build__buttons">
          <MaterialButton
            icon="icon-edit"
            :modifiers="{ secondary: true }"
            @click="emit('edit', $event)"
          />
          <MaterialButton
            icon="icon-delete"
            :modifiers="{ danger: true }"
            @click="emit('delete', $event)"
          />
        </div>
      </div>
    </div>
    <ul class="character-build__equipments">
      <li :class="GenerateModifiers('character-build__equipments-item', { weapon: true })">
        <Weapon
          :weapon="props.build.weapon"
          :modifiers="{ tiny: true }"
          @click.stop.prevent
        />
        <ToolTip class="character-build__tooltip">
          <ul class="character-build__tooltip__sub-stat">
            <li class="artefact-sub-stat">
              {{ props.build.weapon.getI18n('name') }}
            </li>
            <li class="artefact-sub-stat">
              <span class="artefact-sub-stat__value">
                <span class="icon-atk" />
                {{ t('App.Artefact.stats.Atk.short') }}
                {{ Math.round(props.build.weapon.currentAtk) }}
              </span>
            </li>
            <li class="artefact-sub-stat">
              <span class="artefact-sub-stat__value">
                <span :class="`icon-${formatAffix(props.build.weapon.statName)}`" />
                {{ t(`App.Artefact.stats.${props.build.weapon.statName}.short`) }}
                {{ Math.round(props.build.weapon.currentSubStat * 10) / 10 }}{{ props.build.weapon.statName.endsWith('%') ? '%' : '' }}
              </span>
            </li>
          </ul>
        </ToolTip>
      </li>
      <li
        v-for="(artefact, i) in props.build.artefacts"
        :key="i"
        :class="GenerateModifiers('character-build__equipments-item', { artefact: true })"
      >
        <Artefact
          :artefact="artefact"
          :modifiers="{ tiny: true }"
          @click.stop.prevent
        />
        <ToolTip class="character-build__tooltip">
          <ul class="character-build__tooltip__sub-stat">
            <li class="artefact-sub-stat">
              <span class="artefact-sub-stat__value">
                <span :class="`icon-${formatAffix(artefact.statsJson[0].name)}`">
                  {{ t(`App.Artefact.stats.${artefact.statsJson[0].name}.short`) }}
                </span>
                {{ artefact.statsJson[0].value }}{{ artefact.statsJson[0].name.endsWith('%') ? '%' : '' }}
              </span>
            </li>
            <li v-for="(stat, i) in artefact.statsJson.slice(1)" :key="i">
              <ArtefactSubStat :stat="stat" />
            </li>
          </ul>
        </ToolTip>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';

import MaterialButton from '@renderer/components/Materials/Button/index.vue';
import ToolTip from '@renderer/components/MyGenshinImpactCharacters/ToolTip.vue';
import Artefact from '@renderer/components/MyGenshinImpactCharacters/Artefact/index.vue';
import ArtefactSubStat from '@renderer/components/MyGenshinImpactCharacters/Artefact/SubStat.vue';
import Weapon from '@renderer/components/MyGenshinImpactCharacters/Weapon/index.vue';

defineOptions({ name: 'CharacterBuild' });

const { t } = useI18n();
const emit = defineEmits(['edit', 'delete']);
const formatAffix = (val) => val.toLowerCase().replace('%', '');

const props = defineProps({
  build: { type: Object, required: true },
});
</script>

<style lang="scss" src="./index.scss">
</style>
