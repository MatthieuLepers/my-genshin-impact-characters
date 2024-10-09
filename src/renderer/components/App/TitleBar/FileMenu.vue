<template>
  <ContextMenu :visible="props.visible">
    <ContextMenuSubMenu
      :label="t('App.TitleBarMenu.fileMenu.selectTravelerGender')"
      @over="state.activeSubMenu = 'selectTravelerGender'"
      @out="state.activeSubMenu = null"
    >
      <ContextMenu
        :visible="state.activeSubMenu === 'selectTravelerGender'"
        anchor="top right"
      >
        <ContextMenuItem
          :label="t('App.TitleBarMenu.fileMenu.male')"
          :icon="settingsStore.actions.getString('travelerGender') === 'Male' ? 'icon-check' : null"
          @click="settingsStore.actions.setString('travelerGender', 'Male')"
        />
        <ContextMenuItem
          :label="t('App.TitleBarMenu.fileMenu.female')"
          :icon="settingsStore.actions.getString('travelerGender') === 'Female' ? 'icon-check' : null"
          @click="settingsStore.actions.setString('travelerGender', 'Female')"
        />
      </ContextMenu>
    </ContextMenuSubMenu>
    <ContextMenuSeparator />
    <ContextMenuItem
      :label="t('App.TitleBarMenu.fileMenu.exit')"
      :shortcut="plateform === 'darwin' ? 'Cmd+Q' : 'Alt+F4'"
      @click="actions.closeApp"
    />
  </ContextMenu>
</template>

<script setup>
import { reactive } from 'vue';
import { useI18n } from 'vue-i18n';

import ContextMenu from '@renderer/components/Materials/ContextMenu/index.vue';
import ContextMenuItem from '@renderer/components/Materials/ContextMenu/Item.vue';
import ContextMenuSeparator from '@renderer/components/Materials/ContextMenu/Separator.vue';
import ContextMenuSubMenu from '@renderer/components/Materials/ContextMenu/SubMenu.vue';
import { settingsStore } from '@/renderer/core/entities/setting/store';

defineOptions({ name: 'AppTitleBarFileMenu' });

const { t } = useI18n();
const { plateform } = api;

const props = defineProps({
  visible: { type: Boolean, required: true },
  name: { type: String, required: true },
});

const state = reactive({
  activeSubMenu: null,
});

const actions = {
  closeApp() {
    api.send(`close:${props.name}`);
  },
};
</script>
