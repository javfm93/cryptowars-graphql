import { Query } from '../../../../Shared/Domain/Query';

export class ListBattlesByArmyIdQuery extends Query {
  constructor(readonly armyId: string, readonly playerId: string) {
    super();
  }
}
