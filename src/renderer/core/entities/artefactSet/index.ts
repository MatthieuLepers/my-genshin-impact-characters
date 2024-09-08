import AbstractEntity from '@renderer/core/entities/AbstractEntity';
import { IArtefactSet, IRemoteArtefactSet } from '@renderer/core/entities/artefactSet/i';

export default class ArtefactSet extends AbstractEntity<IArtefactSet> {
  declare readonly id: string;

  declare readonly releasedAt: Date;

  constructor(data: IArtefactSet) {
    super(data, []);
  }

  static async findAll(): Promise<Array<ArtefactSet>> {
    const sets = await api.ArtefactSet.findAll();
    return sets.map((set: IRemoteArtefactSet) => new ArtefactSet(set.dataValues));
  }
}
