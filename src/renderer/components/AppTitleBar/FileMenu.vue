<template>
  <ContextMenu :visible="visible">
    <ContextMenuItem
      :label="$t('TitleBarMenu.fileMenu.save')"
      shortcut="Ctrl+S"
      @click="save"
    />
    <ContextMenuSeparator />
    <ContextMenuItem
      :label="$t('TitleBarMenu.fileMenu.exit')"
      shortcut="Alt+F4"
      @click="closeApp"
    />
  </ContextMenu>
</template>

<script>
import { remote } from 'electron';

import ContextMenu from '@/components/UI/ContextMenu/index';
import ContextMenuItem from '@/components/UI/ContextMenu/Item';
import ContextMenuSeparator from '@/components/UI/ContextMenu/Separator';
import NotificationStore from '@/components/UI/Notification/Store';

import AppStore from '@/js/stores/AppStore';

export default {
  name: 'AppTitleBarFileMenu',
  components: { ContextMenu, ContextMenuItem, ContextMenuSeparator },
  props: {
    visible: { type: Boolean, required: true },
  },
  methods: {
    closeApp() {
      remote.getCurrentWindow().close();
    },
    save() {
      const success = AppStore.save();
      if (success) {
        NotificationStore.success('Sauvegardé !');
      } else {
        NotificationStore.error('Échec de la sauvegarde');
      }
      this.$emit('close');
    },
  },
};
</script>
