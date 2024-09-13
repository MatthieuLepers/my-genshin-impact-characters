<template>
  <main class="View WeaponListView">
    <div
      class="WeaponCategory"
      v-for="group in Object.keys(State.weaponList).reverse()"
      :key="group"
    >
      <span class="WeaponCategoryHeader">
        [{{ actions.countOwned(State.weaponList[group]) }}/{{ actions.getMaxOfCategory(State.weaponList[group]) }}] {{ t('App.Weapons.weapons', [`${group}★`]) }}
      </span>

      <div
        v-for="(type, i) in Object.keys(State.weaponList[group])"
        :key="i"
        class="WeaponCategoryType"
      >
        <button
          type="button"
          class="WeaponCategoryTypeHeader"
          @click="actions.handleClickShowType(`${group}${type}`)"
        >
          <img :src="image(`img/weapons/${State.weaponList[group][type][0].name}.webp`)" alt="" />
          [{{ actions.countOwned(State.weaponList[group], type) }}/{{ State.weaponList[group][type].length }}] {{ t(`App.Weapons.type.${type}`, 2) }}
        </button>
        <MaterialDataTable
          v-if="state.showedTypes.includes(`${group}${type}`)"
          class="WeaponCategoryTypeDataTable"
          :data="State.weaponList[group][type]"
          :columns="State.columns"
          :perPage="6"
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
              <ul class="WeaponCategoryTags">
                <li class="WeaponCategoryTagsItem" v-for="(tag, i) in obj.tags" :key="i">
                  {{ te(`App.Weapons.tags.${tag}`) ? t(`App.Weapons.tags.${tag}`) : tag }}
                </li>
              </ul>
            </span>
          </template>
          <template #owned="{ obj }">
            <MaterialFormToggle
              v-model="obj.owned"
              label=""
              @update:modelValue="actions.handleToggleOwned(obj)"
            />
          </template>
          <template #level="{ obj }">
            <MaterialFormInput
              v-model="obj.level"
              :disabled="!obj.owned"
              :min="1"
              :max="obj.maxLevel"
              type="number"
              label=""
              @wheel.stop
              @update:modelValue="obj.save()"
            />
          </template>
          <template #rank="{ obj }">
            <MaterialFormInput
              v-model="obj.rank"
              :disabled="!obj.owned"
              :min="1"
              :max="5"
              type="number"
              label=""
              @wheel.stop
              @update:modelValue="obj.save()"
            />
          </template>
        </MaterialDataTable>
      </div>
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

const { t, te } = useI18n();

const state = reactive({
  showedTypes: [],
});

const State = computed(() => ({
  weaponList: weaponsStore.weaponList.value.reduce((acc, val) => ({
    ...acc,
    [val.rarity]: {
      ...(acc[val.rarity] ?? {}),
      [val.type]: [
        ...(acc[val.rarity]?.[val.type] ?? []),
        val,
      ],
    },
  }), {}),
  columns: {
    name: { label: 'Nom', className: 'flexy__col flexy__col--1of2' },
    owned: { label: 'Possédée ?', className: 'flexy__col flexy__col--1of6' },
    level: { label: 'Niveau', className: 'flexy__col flexy__col--1of6' },
    rank: { label: 'Rang', className: 'flexy__col flexy__col--1of6' },
  },
}));

const actions = {
  countOwned(weaponList, type = null) {
    const list = !type
      ? Object.values(weaponList).reduce((acc, val) => [...acc, ...val], [])
      : weaponList[type]
    ;

    return list.filter(({ owned }) => owned).length;
  },
  getMaxOfCategory(weaponListCategory) {
    return Object.values(weaponListCategory).reduce((acc, val) => acc + val.length, 0);
  },
  handleClickShowType(groupTypeId) {
    if (state.showedTypes.includes(groupTypeId)) {
      state.showedTypes = state.showedTypes.filter((gt) => gt !== groupTypeId);
    } else {
      state.showedTypes.push(groupTypeId);
    }
  },
  handleToggleOwned(obj) {
    if (!obj.owned) {
      obj.level = 1;
    }
    obj.save();
  },
};
</script>

<style lang="scss" src="./index.scss">
</style>
