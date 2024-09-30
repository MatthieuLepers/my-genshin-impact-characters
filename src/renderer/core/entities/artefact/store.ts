import { reactive, computed } from 'vue';
import type { OpenDialogOptions, SaveDialogOptions } from 'electron';

import Artefact from '@renderer/core/entities/artefact';
import type { IArtefact } from '@renderer/core/entities/artefact/i';
import type ArtefactSet from '@renderer/core/entities/artefactSet';

interface ArtefactFilters {
  type: Array<string>;
  set: Array<ArtefactSet>;
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
      set: [],
      mainStat: [],
      subStat: [],
    },
  });

  const filters = (artefact: Artefact): boolean => (state.filters.type.length === 0 || (state.filters.type.length > 0 && state.filters.type.includes(artefact.type)))
    && (state.filters.set.length === 0 || (state.filters.set.length > 0 && state.filters.set.some((set) => set.id === artefact.setId)))
    && (state.filters.mainStat.length === 0 || (state.filters.mainStat.length > 0 && state.filters.mainStat.includes(artefact.mainStat.name)))
    && (state.filters.subStat.length === 0 || (state.filters.subStat.length > 0 && state.filters.subStat.every((stat) => artefact.subStats.some((s) => s.name === stat))))
  ;

  const artefactList = computed(() => Object
    .values(state.artefacts)
    .sort((a, b) => b.artefactSet.releasedAt.getTime() - a.artefactSet.releasedAt.getTime()
      || a.artefactSet.getI18n('name').localeCompare(b.artefactSet.getI18n('name'))
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
        set: [],
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
    async requestExportMultiple(dialogOptions: SaveDialogOptions) {
      await api.invoke('exportMultipleArtefact', JSON.stringify(Object
        .values(state.artefacts)
        .map(({ id }) => id)), dialogOptions);
    },
    async requestImport(dialogOptions: OpenDialogOptions): Promise<boolean> {
      const artefactJson = await api.invoke('importArtefact', dialogOptions);
      try {
        const parsedArtefactList: Array<IArtefact> = JSON.parse(artefactJson);
        await Promise.all(parsedArtefactList.map((artefactData: IArtefact) => actions.create(artefactData)));
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
