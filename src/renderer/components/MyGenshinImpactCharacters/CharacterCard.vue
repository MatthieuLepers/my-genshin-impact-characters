<template>
  <div class="CharacterCard">
    <img class="CharacterCardImage"
      :src="image(`img/characters/${props.character.imageName}.png`)"
      :alt="props.character.name"
    />
    <div class="CharacterCardInfo">
      <img
        v-if="props.showElement"
        class="CharacterCardElement"
        :src="image(`img/elements/${props.character.element.toLowerCase()}.png`)"
        :alt="props.character.element"
      />
      <span class="CharacterCardName">
        {{ props.character.name }}
      </span>
    </div>
  </div>
</template>

<script setup>
import Character from '@renderer/core/classes/Character';
import { image } from '@renderer/core/utils';

defineOptions({ name: 'CharacterCard' });

const props = defineProps({
  character: { type: Character, required: true },
  showElement: { type: Boolean, default: false },
});
</script>

<style lang="scss" src="./CharacterCard.scss">
</style>
