<template>
  <ContextMenu :visible="props.visible">
    <ContextMenuItem
      :label="t('App.TitleBarMenu.fileMenu.save')"
      icon="icon-save"
      shortcut="Ctrl+S"
      @click="actions.save"
    />
    <ContextMenuSeparator />
    <ContextMenuItem
      :label="t('App.TitleBarMenu.fileMenu.exit')"
      :shortcut="plateform === 'darwin' ? 'Cmd+Q' : 'Alt+F4'"
      @click="actions.closeApp"
    />
  </ContextMenu>
</template>

<script setup>
import { useI18n } from 'vue-i18n';

import ContextMenu from '@renderer/components/Materials/ContextMenu/index.vue';
import ContextMenuItem from '@renderer/components/Materials/ContextMenu/Item.vue';
import ContextMenuSeparator from '@renderer/components/Materials/ContextMenu/Separator.vue';

import { notificationStore } from '@renderer/components/Materials/Notification/Store';
import AppStore from '@renderer/core/stores/AppStore';

defineOptions({ name: 'AppTitleBarFileMenu' });

const { t, locale } = useI18n();
const { plateform } = api;

const props = defineProps({
  visible: { type: Boolean, required: true },
  name: { type: String, required: true },
});

const emit = defineEmits(['close']);

const actions = {
  closeApp() {
    api.send(`close:${props.name}`);
  },
  save() {
    const success = AppStore.save(locale.value);
    if (success) {
      notificationStore.actions.success(t('Notification.saveSuccess'));
    } else {
      notificationStore.actions.error(t('Notification.saveError'));
    }
    emit('close');
  },
};
</script>
