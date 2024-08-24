import { reactive, computed } from 'vue';

import { charactersStore } from '@renderer/core/entities/character/store';

const useAppStore = () => {
  const state = reactive({
    newlyModalOpened: false,
  });

  const newlyReleasedCharacters = computed(() => Object
    .values(charactersStore.state.characters)
    .filter((character) => character.isReleased() && new Date(character.releasedAt!).getTime() + 864000000 >= Date.now() && !character.owned))
  ;

  return {
    state,
    newlyReleasedCharacters,
  };
};

export const appStore = useAppStore();
