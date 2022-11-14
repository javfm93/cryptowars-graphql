import { BattleCreatedDomainEvent } from '../../../../../src/Contexts/Battlefield/Battles/Domain/BattleCreatedDomainEvent';
import { Battle } from '../../../../../src/Contexts/Battlefield/Battles/Domain/Battle';

export class BattleExposedEventsGenerator {
  static battleCreatedFor(battle: Battle): BattleCreatedDomainEvent {
    return new BattleCreatedDomainEvent({
      aggregateId: battle.id.toString(),
      attack: battle.attack.toPrimitives(),
      defenderArmy: battle.defenderArmy.toPrimitives(),
      finishedAt: new Date(battle.finishedAt),
      result: battle.result
    });
  }
}
