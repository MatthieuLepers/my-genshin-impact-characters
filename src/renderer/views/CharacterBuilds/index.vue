<template>
  <div class="View CharacterBuildsView">
    <div :class="GenerateModifiers('CharacterBuildList', {
      scrollable: characterBuildsStore.sortedByCharacterReleaseDateBuildList.value.length > 2,
    })">
      <ul>
        <li v-for="(build, i) in characterBuildsStore.sortedByCharacterReleaseDateBuildList.value" :key="i">
          <CharacterBuild
            :build="build"
            @edit="actions.handleClickEdit(build)"
            @delete="actions.handleClickDelete(build)"
          />
        </li>
      </ul>
    </div>

    <div class="CharacterBuildButtons" v-if="characterBuildsStore.sortedByCharacterReleaseDateBuildList.value.length > 0">
      <MaterialButton
        icon="icon-plus"
        :modifiers="{ secondary: true }"
        @click="modalStore.actions.show('buildFormModal')"
      >
        {{ t('App.CharacterBuild.addBtnLabel') }}
      </MaterialButton>
    </div>

    <CharacterBuildFormModal
      :formData="characterBuildsStore.state.current ?? {}"
      :allowClose="State.allowClose"
      @submit="actions.handleSubmit"
      @close="characterBuildsStore.state.current = null"
    />

    <MaterialModal
      name="deleteBuildModal"
      :title="t('App.CharacterBuild.deleteModal.title')"
      :acceptLabel="t('App.CharacterBuild.deleteModal.acceptLabel')"
      :refuseLabel="t('App.CharacterBuild.deleteModal.refuseLabel')"
      @accept="actions.handleConfirmDelete"
    >
      {{ t('App.CharacterBuild.deleteModal.content') }}
    </MaterialModal>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';

import MaterialButton from '@renderer/components/Materials/Button/index.vue';
import MaterialModal from '@renderer/components/Materials/Modal/index.vue';
import CharacterBuild from '@renderer/components/MyGenshinImpactCharacters/CharacterBuild/index.vue';
import CharacterBuildFormModal from '@renderer/views/CharacterBuilds/CharacterBuildFormModal.vue';

import { notificationStore } from '@renderer/components/Materials/Notification/Store';
import { modalStore } from '@renderer/components/Materials/Modal/Store';
import { charactersStore } from '@renderer/core/entities/character/store';
import { characterBuildsStore } from '@renderer/core/entities/characterBuild/store';

const { t } = useI18n();

defineOptions({ name: 'CharacterBuildsView' });

const actions = {
  async handleSubmit(formData) {
    let success;
    const data = {
      name: formData.name,
      characterId: charactersStore.state.characters[formData.characterName].id,
      flowerId: formData.flower?.id ?? null,
      featherId: formData.feather?.id ?? null,
      sandsId: formData.sands?.id ?? null,
      gobletId: formData.goblet?.id ?? null,
      circletId: formData.circlet?.id ?? null,
      weaponId: formData.weapon?.id ?? null,
    };

    if (characterBuildsStore.state.current) {
      success = await characterBuildsStore.actions
        .update(data)
        .then(() => true)
        .catch(() => false)
      ;
    } else {
      success = await characterBuildsStore.actions.create(data);
    }

    if (success) {
      notificationStore.actions.success(t('App.CharacterBuild.successNotification', [formData.name]));
    } else {
      notificationStore.actions.error(t('App.CharacterBuild.errorNotification'));
    }
    characterBuildsStore.state.current = null;
  },
  handleClickEdit(build) {
    characterBuildsStore.state.current = build;
    modalStore.actions.show('buildFormModal');
  },
  handleClickDelete(build) {
    characterBuildsStore.state.current = build;
    modalStore.actions.show('deleteBuildModal');
  },
  async handleConfirmDelete() {
    await characterBuildsStore.actions.destroy();
  },
};

const State = computed(() => ({
  allowClose: characterBuildsStore.sortedByCharacterReleaseDateBuildList.value.length > 0,
}));

onMounted(() => {
  if (!State.value.allowClose) {
    modalStore.actions.show('buildFormModal');
  }
});
</script>

<style lang="scss" src="./index.scss">
</style>
