<template>
  <ContextMenu :visible="visible">
    <ContextMenuItem
      :label="$t('App.TitleBarMenu.fileMenu.save')"
      icon="icon-save"
      shortcut="Ctrl+S"
      @click="save"
    />
    <ContextMenuSeparator />
    <ContextMenuItem
      :label="$t('App.TitleBarMenu.fileMenu.exit')"
      shortcut="Alt+F4"
      @click="closeApp"
    />
  </ContextMenu>
</template>

<script>
import { remote } from 'electron';

import ContextMenu from '@/components/Materials/ContextMenu/index';
import ContextMenuItem from '@/components/Materials/ContextMenu/Item';
import ContextMenuSeparator from '@/components/Materials/ContextMenu/Separator';
import NotificationStore from '@/components/Materials/Notification/Store';

import AppStore from '@/assets/js/stores/AppStore';

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
      const success = AppStore.save(this.$root.$i18n.locale);
      if (success) {
        NotificationStore.success(this.$t('Notification.saveSuccess'));
      } else {
        NotificationStore.error(this.$t('Notification.saveError'));
      }
      this.$emit('close');
    },
  },
};
</script>
