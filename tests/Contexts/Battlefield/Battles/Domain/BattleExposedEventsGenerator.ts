import { BattleCreatedDomainEvent } from '../../../../../src/Contexts/Battlefield/Battles/Domain/BattleCreatedDomainEvent';
import { Battle } from '../../../../../src/Contexts/Battlefield/Battles/Domain/Battle';
import { Battles } from '../../../../../src/Contexts/Battlefield/Battles/Domain/Battles';
import { BattleTroopReturnedDomainEvent } from '../../../../../src/Contexts/Battlefield/Battles/Domain/BattleTroopReturnedDomainEvent';
import { ArmyTroop } from '../../../../../src/Contexts/Battlefield/Battles/Domain/ArmyTroop';
import { BattleId } from '../../../../../src/Contexts/Battlefield/Battles/Domain/BattleId';

export class BattleExposedEventsGenerator {
  static battleCreatedFor(battle: Battle): BattleCreatedDomainEvent {
    return new BattleCreatedDomainEvent({
      aggregateId: battle.id.toString(),
      attack: battle.attack.toPrimitives(),
      defenderArmy: battle.defenderArmy.toPrimitives(),
      finishedAt: new Date(battle.finishedAt),
      result: battle.result.toPrimitives()
    });
  }

  static multipleBattleCreatedFor(battles: Battles): Array<BattleCreatedDomainEvent> {
    return battles.getItems().map(this.battleCreatedFor);
  }

  static battleTroopReturned(battle: Battle): BattleTroopReturnedDomainEvent {
    return new BattleTroopReturnedDomainEvent({
      aggregateId: battle.id.toString(),
      troop: battle.result.returningTroop.toPrimitives()
    });
  }

  static battleTroopReturnedFromTroop(
    battleId: BattleId,
    troop: ArmyTroop
  ): BattleTroopReturnedDomainEvent {
    return new BattleTroopReturnedDomainEvent({
      aggregateId: battleId.toString(),
      troop: troop.toPrimitives()
    });
  }
}
