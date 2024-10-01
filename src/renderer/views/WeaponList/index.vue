<template>
  <main class="View WeaponListView">
    <PanelMenu
      v-model="weaponsStore.state.filters.type"
      :data="State.panelMenuData"
      @update:modelValue="state.page = 0"
    >
      <template #button="{ item }">
        {{ item.label }} ({{ actions.countOwned(item.id) }}/{{ State.weaponList[item.id]?.length ?? 0 }})
      </template>
      <template #[weaponsStore.state.filters.type]>
        <div class="WeaponCategory">
          <WeaponFilters />

          <MaterialDataTable
            v-model:page="state.page"
            class="WeaponCategoryDataTable"
            :data="weaponsStore.weaponList.value"
            :columns="State.columns"
            :perPage="8"
            :showActionRow="false"
            :allowMoveFn="() => false"
          >
            <template #name="{ obj }">
              <img
                class="WeaponCategoryImg"
                :src="obj.image"
                alt=""
              />
              <span>
                {{ obj.getI18n('name') }}<br />
                {{ [...Array(obj.rarity).keys()].reduce((acc) => `${acc}★`, '') }}
                <ul class="WeaponCategoryTags">
                  <li
                    v-for="(tag, i) in obj.tags"
                    :key="i"
                    :class="GenerateModifiers('WeaponCategoryTagsItem', {
                      selected: weaponsStore.state.filters.search.length > 0 && ((te(`App.Weapons.tags.${tag}`) ? t(`App.Weapons.tags.${tag}`) : tag).toLowerCase().includes(weaponsStore.state.filters.search.toLowerCase()) || tag.toLowerCase().includes(weaponsStore.state.filters.search.toLowerCase())),
                    })"
                  >
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
import { onBeforeRouteLeave } from 'vue-router';
import { useI18n } from 'vue-i18n';

import MaterialDataTable from '@renderer/components/Materials/DataTable/index.vue';
import MaterialFormToggle from '@renderer/components/Materials/Form/Toggle.vue';
import MaterialFormInput from '@renderer/components/Materials/Form/Input.vue';
import PanelMenu from '@renderer/components/MyGenshinImpactCharacters/PanelMenu.vue';
import WeaponFilters from '@renderer/components/MyGenshinImpactCharacters/Weapon/Filters.vue';

import { weaponsStore } from '@renderer/core/entities/weapon/store';

defineOptions({ name: 'WeaponListView' });

const { t, te, tm } = useI18n();

const state = reactive({
  page: 0,
});

const State = computed(() => ({
  panelMenuData: Object
    .keys(tm('App.Weapons.type'))
    .map((weaponType) => ({
      id: weaponType,
      label: t(`App.Weapons.type.${weaponType}`, 2),
    })),
  weaponList: weaponsStore.groupedByTypeWeaponList.value,
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
    return (State.value.weaponList[type] ?? [])
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

onBeforeRouteLeave(() => {
  weaponsStore.state.filters.search = '';
});
</script>

<style lang="scss" src="./index.scss">
</style>
