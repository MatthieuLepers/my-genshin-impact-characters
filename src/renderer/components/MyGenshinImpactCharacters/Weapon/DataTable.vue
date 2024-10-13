<template>
  <MaterialDataTable
    v-if="props.visible"
    :class="GenerateModifiers('WeaponDataTable', { open: props.visible })"
    :columns="columns"
    :paginate="false"
    :enableActionRow="false"
    :data="props.data"
    :showActionRow="false"
    :allowMoveFn="() => false"
  >
    <template #name="{ obj }">
      <img
        class="WeaponDataTableImg"
        :src="obj.image"
        alt=""
      />
      <span>
        {{ obj.getI18n('name') }}<br />
        {{ [...Array(obj.rarity).keys()].reduce((acc) => `${acc}★`, '') }}
        <WeaponTags :weapon="obj" />
      </span>
    </template>
    <template #owned="{ obj }">
      <MaterialFormToggle
        v-model="obj.owned"
        label=""
        @update:modelValue="emit('owned', obj)"
      />
    </template>
    <template #level="{ obj }">
      <MaterialFormInput
        v-model="obj.level"
        :disabled="!obj.owned"
        :min="1"
        :max="obj.maxLevel"
        :class="{
          common: obj.level > 20 && obj.level <= 40,
          uncommon: obj.level > 40 && obj.level < (obj.rarity <= 3 ? 50 : 80),
          rare: obj.level >= obj.maxLevel - 10 && obj.level < obj.maxLevel,
          epic: obj.level === obj.maxLevel,
        }"
        type="number"
        label=""
        @wheel.stop
        @update:modelValue="obj.save()"
      />
    </template>
    <template #rank="{ obj }">
      <MaterialFormInput
        v-if="obj.maxRank > 1"
        v-model="obj.rank"
        :disabled="!obj.owned"
        :min="1"
        :max="obj.maxRank ?? 5"
        :class="{
          common: obj.rank === 2,
          uncommon: obj.rank === 3,
          rare: obj.rank === 4,
          epic: obj.rank === (obj.maxRank ?? 5),
        }"
        type="number"
        label=""
        @wheel.stop
        @update:modelValue="obj.save()"
      />
    </template>
  </MaterialDataTable>
</template>

<script setup>
import { useI18n } from 'vue-i18n';

import MaterialDataTable from '@renderer/components/Materials/DataTable/index.vue';
import MaterialFormToggle from '@renderer/components/Materials/Form/Toggle.vue';
import MaterialFormInput from '@renderer/components/Materials/Form/Input.vue';
import WeaponTags from '@renderer/components/MyGenshinImpactCharacters/Weapon/Tags.vue';

defineOptions({ name: 'WeaponDataTable' });

const { t } = useI18n();
const columns = {
  name: {
    label: t('App.Weapons.DataTable.name'),
    className: 'flexy__col flexy__col--1of2',
  },
  owned: {
    label: t('App.Weapons.DataTable.owned'),
    className: 'flexy__col flexy__col--1of6',
  },
  level: {
    label: t('App.Weapons.DataTable.level'),
    className: 'flexy__col flexy__col--1of6',
  },
  rank: {
    label: t('App.Weapons.DataTable.rank'),
    className: 'flexy__col flexy__col--1of6',
  },
};

const emit = defineEmits(['owned']);

const props = defineProps({
  visible: { type: Boolean, default: true },
  data: { type: Array, default: () => [] },
});
</script>

<style lang="scss" src="./DataTable.scss">
</style>
