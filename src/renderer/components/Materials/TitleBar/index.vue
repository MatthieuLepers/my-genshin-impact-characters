<template>
  <nav class="m-title-bar">
    <slot name="menu" :windowName="props.name" />

    <div class="m-title-bar__app" v-if="props.appTitle">
      {{ props.appTitle }}
    </div>
    <div class="m-title-bar__button-ctn">
      <button
        v-if="props.showHelp"
        type="button"
        class="m-title-bar__button"
        @click="emit('help')"
      >
        <span v-icon:help />
      </button>
      <button
        v-if="!api.isWeb && props.minimizable"
        type="button"
        class="m-title-bar__button"
        @click="actions.minimize"
      >
        <span v-icon:minimize />
      </button>
      <button
        v-if="!api.isWeb && (props.maximizable || props.minimizable)"
        :disabled="!props.maximizable"
        class="m-title-bar__button"
        @click="actions.maximize">
        <span v-icon:maximize />
      </button>
      <button
        v-if="!api.isWeb && props.closable"
        :class="GenerateModifiers('m-title-bar__button', { close: true })"
        @click="actions.close"
      >
        <span v-icon:close />
      </button>
    </div>
  </nav>
</template>

<script setup>
import { api } from '@renderer/core/api';

defineOptions({ name: 'TitleBar' });

const emit = defineEmits(['help']);

const props = defineProps({
  name: { type: String, required: true },
  minimizable: { type: Boolean, default: true },
  maximizable: { type: Boolean, default: true },
  closable: { type: Boolean, default: true },
  showHelp: { type: Boolean, default: true },
  appTitle: { type: String, default: null },
});

const actions = {
  minimize() {
    api.send(`minimize:${props.name}`);
  },
  maximize() {
    api.send(`maximize:${props.name}`);
  },
  close() {
    api.send(`close:${props.name}`);
  },
};
</script>

<style lang="scss" src="./index.scss">
</style>
