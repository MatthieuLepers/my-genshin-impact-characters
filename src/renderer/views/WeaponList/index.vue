<template>
  <main class="View WeaponListView">
    <PanelMenu
      v-model="state.currentMenu"
      :data="State.panelMenuData"
    >
      <template #button="{ item }">
        {{ item.label }} ({{ actions.countOwned(item.id) }}/{{ State.weaponList[item.id].length }})
      </template>
      <template #[state.currentMenu]>
        <div class="WeaponCategory">
          <MaterialDataTable
            class="WeaponCategoryDataTable"
            :data="State.weaponList[state.currentMenu]"
            :columns="State.columns"
            :paginate="false"
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
      </template>
    </PanelMenu>
  </main>
</template>

<script setup>
import { reactive, computed } from 'vue';
import { useI18n } from 'vue-i18n';

import MaterialDataTable from '@renderer/components/Materials/DataTable/index.vue';
import MaterialFormToggle from '@renderer/components/Materials/Form/Toggle.vue';
import MaterialFormInput from '@renderer/components/Materials/Form/Input.vue';
import PanelMenu from '@renderer/components/MyGenshinImpactCharacters/PanelMenu.vue';

import { image } from '@renderer/core/utils';
import { weaponsStore } from '@renderer/core/entities/weapon/store';

defineOptions({ name: 'WeaponListView' });

const { t, te, tm } = useI18n();

const state = reactive({
  currentMenu: 'bow',
});

const State = computed(() => ({
  panelMenuData: Object
    .keys(tm('App.Weapons.type'))
    .map((weaponType) => ({
      id: weaponType,
      label: t(`App.Weapons.type.${weaponType}`, 2),
    })),
  weaponList: weaponsStore.weaponList.value.reduce((acc, val) => ({
    ...acc,
    [val.type]: [
      ...(acc?.[val.type] ?? []),
      val,
    ],
  }), {}),
  columns: {
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
  },
}));

const actions = {
  countOwned(type) {
    return State.value.weaponList[type]
      .filter(({ owned }) => owned)
      .length
    ;
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
