import { Query } from '../../../../Shared/Domain/Query';

type Params = {
  playerId: string;
  armyId: string;
};

export class FindArmyByArmyIdQuery extends Query {
  playerId: string;
  armyId: string;

  constructor({ playerId, armyId }: Params) {
    super();
    this.playerId = playerId;
    this.armyId = armyId;
  }

  isEqualTo(query: FindArmyByArmyIdQuery): boolean {
    return this.armyId === query.armyId && this.playerId === query.playerId;
  }
}
