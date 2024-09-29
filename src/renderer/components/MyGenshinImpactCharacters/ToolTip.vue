<template>
  <div :class="GenerateModifiers('tooltip', {
    [`v-${props.verticalAnchor}`]: true,
    [`h-${props.horizontalAnchor}`]: true,
  })">
    <slot />
  </div>
</template>

<script setup>
const props = defineProps({
  visible: { type: Boolean, default: false },
  horizontalAnchor: { type: String, default: 'center' },
  verticalAnchor: { type: String, default: 'top' },
});
</script>

<style lang="scss" src="./ToolTip.scss">
</style>
