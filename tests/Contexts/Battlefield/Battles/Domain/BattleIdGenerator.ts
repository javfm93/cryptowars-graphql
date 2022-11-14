import { BattleId } from '../../../../../src/Contexts/Battlefield/Battles/Domain/BattleId';

export class BattleIdGenerator {
  static create(value: string): BattleId {
    return BattleId.create(value);
  }

  static random(): BattleId {
    return this.create(BattleId.random().toString());
  }
}
