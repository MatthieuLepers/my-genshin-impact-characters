<template>
  <main class="View WeaponListView">
    <div
      class="WeaponCategory"
      v-for="group in Object.keys(State.weaponList).reverse()"
      :key="group"
    >
      <button
        type="button"
        class="WeaponCategoryHeader"
        @click="actions.handleClickShowGroup(group)"
      >
        {{ [...Array(parseInt(group, 10)).keys()].reduce((acc) => `${acc}★`, '') }}
      </button>
      <MaterialDataTable
        v-if="state.showedGroups.includes(group)"
        class="WeaponCategoryDataTable"
        :data="State.weaponList[group]"
        :columns="State.columns"
        :perPage="10"
        :showActionRow="false"
        :allowMoveFn="() => false"
      >
        <template #name="{ obj }">
          <img
            class="WeaponCategoryImg"
            :src="image(`img/weapons/${obj.name}.webp`)"
            alt=""
          />
          <span>
            {{ t(`Data.Weapons.${obj.name}.name`) }}<br />
            {{ [...Array(obj.rarity).keys()].reduce((acc) => `${acc}★`, '') }}
          </span>
        </template>
        <template #owned="{ obj }">
          <MaterialFormToggle
            v-model="obj.owned"
            label=""
          />
          <MaterialFormInput
            v-if="obj.owned"
            v-model="obj.level"
            type="number"
            label="Level"
            @wheel.stop
          />
        </template>
      </MaterialDataTable>
    </div>
  </main>
</template>

<script setup>
import { reactive, computed } from 'vue';
import { useI18n } from 'vue-i18n';

import MaterialDataTable from '@renderer/components/Materials/DataTable/index.vue';
import MaterialFormToggle from '@renderer/components/Materials/Form/Toggle.vue';
import MaterialFormInput from '@renderer/components/Materials/Form/Input.vue';

import { image } from '@renderer/core/utils';
import { weaponsStore } from '@renderer/core/entities/weapon/store';

defineOptions({ name: 'WeaponListView' });

const { t } = useI18n();

const state = reactive({
  showedGroups: [],
});

const State = computed(() => ({
  panelMenuData: [
    { id: 'owned', label: 'My weapons' },
    { id: 'all', label: 'All weapons' },
  ],
  weaponList: weaponsStore.weaponList.value.reduce((acc, val) => ({
    ...acc,
    [val.rarity]: [
      ...(acc[val.rarity] ?? []),
      val,
    ],
  }), {}),
  columns: {
    name: { label: 'Nom' },
    owned: { label: 'Possédée ?' },
  },
}));

const actions = {
  handleClickShowGroup(group) {
    if (state.showedGroups.includes(group)) {
      state.showedGroups = state.showedGroups.filter((g) => g !== group);
    } else {
      state.showedGroups.push(group);
    }
  },
};
</script>

<style lang="scss" src="./index.scss">
</style>
