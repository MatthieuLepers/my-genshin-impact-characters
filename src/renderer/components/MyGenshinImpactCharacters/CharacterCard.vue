<template>
  <div class="CharacterCard">
    <img class="CharacterCardImage"
      :src="props.character.getImage('icon_card')"
      :alt="props.character.name"
    />
    <span
      v-if="!props.character.owned && props.character.name.startsWith('Traveler')"
      :class="[`icon-${props.character.element.toLowerCase()}`, 'CharacterCardElement']"
    />
    <div class="CharacterCardInfo">
      <span class="CharacterCardName">
        {{ props.character.nameStr }}
      </span>
    </div>
  </div>
</template>

<script setup>
import Character from '@renderer/core/entities/character';

defineOptions({ name: 'CharacterCard' });

const props = defineProps({
  character: { type: Character, required: true },
  showElement: { type: Boolean, default: false },
});
</script>

<style lang="scss" src="./CharacterCard.scss">
</style>
