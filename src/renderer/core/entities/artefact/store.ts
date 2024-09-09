import { reactive, computed } from 'vue';
import type { OpenDialogOptions, SaveDialogOptions } from 'electron';

import i18n from '@renderer/plugins/i18n';
import Artefact from '@renderer/core/entities/artefact';
import type { IArtefact } from '@renderer/core/entities/artefact/i';

interface ArtefactFilters {
  type: Array<string>;
  setId: Array<string>;
  mainStat: Array<string>;
  subStat: Array<string>;
}

interface IState {
  artefacts: Record<string, Artefact>;
  current: Artefact | null;
  filters: ArtefactFilters;
}

const TYPE_ORDER = ['flower', 'feather', 'sands', 'goblet', 'circlet'];

const useArtefactsStore = () => {
  const state = reactive<IState>({
    artefacts: {},
    current: null,
    filters: {
      type: [],
      setId: [],
      mainStat: [],
      subStat: [],
    },
  });

  const filters = (artefact: Artefact): boolean => (state.filters.type.length === 0 || (state.filters.type.length > 0 && state.filters.type.includes(artefact.type)))
    && (state.filters.setId.length === 0 || (state.filters.setId.length > 0 && state.filters.setId.includes(artefact.setId)))
    && (state.filters.mainStat.length === 0 || (state.filters.mainStat.length > 0 && state.filters.mainStat.includes(artefact.mainStat.name)))
    && (state.filters.subStat.length === 0 || (state.filters.subStat.length > 0 && state.filters.subStat.every((stat) => artefact.subStats.some((s) => s.name === stat))))
  ;

  const artefactList = computed(() => Object
    .values(state.artefacts)
    .sort((a, b) => new Date(b.artefactSet.releasedAt).getTime() - new Date(a.artefactSet.releasedAt).getTime()
      || i18n.global.t(`Data.ArtefactSets.${a.setId}.name`).localeCompare(i18n.global.t(`Data.ArtefactSets.${b.setId}.name`))
      || TYPE_ORDER.indexOf(a.type) - TYPE_ORDER.indexOf(b.type))
    .filter(filters))
  ;

  const actions = {
    getArtefactCountForSet(setId: string): number {
      return Object
        .values(state.artefacts)
        .filter((artefact) => artefact.setId === setId)
        .length
      ;
    },
    resetFilters() {
      state.filters = {
        type: [],
        setId: [],
        mainStat: [],
        subStat: [],
      };
    },
    async load() {
      const objList = await Artefact.findAll();
      state.artefacts = objList.reduce((acc, obj) => ({
        ...acc,
        [obj.id]: obj,
      }), {});
      [state.current] = artefactList.value;
    },
    async create(data: IArtefact): Promise<Artefact> {
      const artefact = await Artefact.create(data);
      state.artefacts[artefact.id] = artefact;
      state.current = artefact;

      return artefact;
    },
    async update(data: IArtefact): Promise<Artefact | null> {
      if (state.current) {
        state.current.setId = data.setId;
        state.current.type = data.type;
        state.current.statsJson = data.statsJson;
        await state.current.save();
      }
      return state.current;
    },
    async destroy() {
      if (state.current) {
        const success = await state.current.destroy();
        if (success) {
          delete state.artefacts[state.current.id];
          [state.current] = artefactList.value;
        }
      }
    },
    async requestExport(dialogOptions: SaveDialogOptions) {
      if (state.current) {
        await api.invoke('exportArtefact', state.current.id, dialogOptions);
      }
    },
    async requestImport(dialogOptions: OpenDialogOptions): Promise<boolean> {
      const artefactJson = await api.invoke('importArtefact', dialogOptions);
      try {
        await actions.create(JSON.parse(artefactJson));
        return true;
      } catch (e) {
        return false;
      }
    },
  };

  return {
    state,
    artefactList,
    actions,
  };
};

export const artefactsStore = useArtefactsStore();
