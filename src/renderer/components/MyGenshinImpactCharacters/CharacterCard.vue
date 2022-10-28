<template>
  <div class="CharacterCard">
    <img class="CharacterCardImage" :src="`static/img/characters/${character.imageName}.png`" :alt="character.name" />
    <div class="CharacterCardInfo">
      <img v-if="showElement" class="CharacterCardElement" :src="`static/img/elements/${character.element.toLowerCase()}.png`" :alt="character.element" />
      <span class="CharacterCardName">{{ character.name }}</span>
    </div>
  </div>
</template>

<script>
import Character from '@/assets/js/classes/Character';

export default {
  name: 'CharacterCard',
  props: {
    character: { type: Character, required: true },
    showElement: { type: Boolean, default: false },
  },
};
</script>

<style lang="scss" src="./CharacterCard.scss">
</style>
