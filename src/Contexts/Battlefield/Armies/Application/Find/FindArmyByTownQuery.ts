import { Query } from '../../../../Shared/Domain/Query';

type Params = {
  playerId: string;
  townId: string;
};

export class FindArmyByTownQuery extends Query {
  playerId: string;
  townId: string;

  constructor({ playerId, townId }: Params) {
    super();
    this.playerId = playerId;
    this.townId = townId;
  }

  isEqualTo(query: FindArmyByTownQuery): boolean {
    return this.townId === query.townId && this.playerId === query.playerId;
  }
}
