import { BattleCreatedDomainEvent } from '../../../../../src/Contexts/Battlefield/Battles/Domain/BattleCreatedDomainEvent';
import { Battle } from '../../../../../src/Contexts/Battlefield/Battles/Domain/Battle';
import { Battles } from '../../../../../src/Contexts/Battlefield/Battles/Domain/Battles';

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

  static multipleBattleCreatedFor(battles: Battles): Array<BattleCreatedDomainEvent> {
    return battles.getItems().map(this.battleCreatedFor);
  }
}
