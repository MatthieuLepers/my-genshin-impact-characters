<template>
  <ContextMenu :visible="visible">
    <ContextMenuItem
      v-for="([lang, iso], i) in Object.entries(langList)"
      :key="i"
      :label="$t(`App.TitleBarMenu.langMenu.${lang}`)"
      :icon="iso === $root.$i18n.locale ? 'icon-check' : ''"
      @click="handleSetLocale(iso)"
    />
  </ContextMenu>
</template>

<script>
import { ipcRenderer } from 'electron';
import ContextMenu from '@/components/Materials/ContextMenu/index';
import ContextMenuItem from '@/components/Materials/ContextMenu/Item';

export default {
  name: 'AppTitleBarLangMenu',
  components: { ContextMenu, ContextMenuItem },
  props: {
    visible: { type: Boolean, required: true },
  },
  computed: {
    langList() {
      return {
        english: 'en-EN',
        french: 'fr-FR',
      };
    },
  },
  methods: {
    handleSetLocale(iso) {
      ipcRenderer.invoke('locale-change', iso);
      this.$emit('input', iso);
      this.$emit('close');
    },
  },
};
</script>
