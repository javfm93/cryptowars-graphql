import { BattleId } from './BattleId';
import { AggregateRoot } from '../../Shared/Domain/FlatAggregateRoot';
import { Army } from '../../Armies/Domain/Army';
import { Primitives } from '../../../Shared/Domain/Primitives';
import { BattleCreatedDomainEvent } from './BattleCreatedDomainEvent';
import { SquadTypes } from '../../Armies/Domain/Squads';
import { BattlefieldInternalEvent } from '../../Shared/Domain/BattlefieldInternalEvent';
import { Uuid } from '../../../Shared/Domain/value-object/Uuid';
import { Attack } from '../../Attacks/Domain/Attack';
import { BattleResult } from './BattleResult';
import { BattleTroopReturnedDomainEvent } from './BattleTroopReturnedDomainEvent';

export class Battle extends AggregateRoot {
  readonly finishedAt: string;
  readonly result: BattleResult;

  private constructor(id: BattleId, readonly attack: Attack, readonly defenderArmy: Army) {
    super(id);
    this.finishedAt = new Date().toISOString();
    this.result = this.resolve();
  }

  public static create(id: BattleId, attack: Attack, defenderArmy: Army): Battle {
    const battle = new Battle(id, attack, defenderArmy);
    battle.record(
      new BattleCreatedDomainEvent({
        aggregateId: battle.id.toString(),
        attack: attack.toPrimitives(),
        defenderArmy: defenderArmy.toPrimitives(),
        finishedAt: new Date(battle.finishedAt),
        result: battle.result.toPrimitives()
      })
    );
    return battle;
  }

  private resolve(): BattleResult {
    const attackerSoldiers = this.attack.attackerTroop.squads.value.basic;
    const defenderSoldiers = this.defenderArmy.squads.value.basic;
    if (attackerSoldiers > defenderSoldiers) {
      return this.calculateAttackerVictory(attackerSoldiers, defenderSoldiers);
    } else {
      return this.calculateDefenderVictory(attackerSoldiers);
    }
  }

  private calculateAttackerVictory(
    attackerSoldiers: number,
    defenderSoldiers: number
  ): BattleResult {
    const returningTroop = {
      armyId: this.attack.attackerTroop.armyId.toString(),
      squads: { [SquadTypes.basic]: attackerSoldiers - defenderSoldiers }
    };
    const casualties = { [SquadTypes.basic]: defenderSoldiers };
    return BattleResult.fromPrimitives({
      winner: 'attacker',
      attackerCasualties: casualties,
      defenderCasualties: casualties,
      returningTroop
    });
  }

  private calculateDefenderVictory(attackerSoldiers: number): BattleResult {
    const returningTroop = {
      armyId: this.attack.attackerTroop.armyId.toString(),
      squads: {
        [SquadTypes.basic]: 0
      }
    };
    const casualties = { [SquadTypes.basic]: attackerSoldiers };
    return BattleResult.fromPrimitives({
      winner: 'defender',
      attackerCasualties: casualties,
      defenderCasualties: casualties,
      returningTroop
    });
  }

  toPrimitives(): Primitives<Battle> {
    return {
      id: this.id.toString(),
      attack: this.attack.toPrimitives(),
      defenderArmy: this.defenderArmy.toPrimitives(),
      finishedAt: this.finishedAt,
      result: this.result.toPrimitives()
    };
  }

  static fromPrimitives(plainData: Primitives<Battle>): Battle {
    const id = BattleId.create(plainData.id);
    const attack = Attack.fromPrimitives(plainData.attack);
    const defenderArmy = Army.fromPrimitives(plainData.defenderArmy);
    return new Battle(id, attack, defenderArmy);
  }

  static materializeFrom(events: Array<BattlefieldInternalEvent>): Battle {
    let battle = Battle.create(Uuid.random(), Attack.materializeFrom([]), Army.materializeFrom([]));

    for (const event of events) {
      if (BattleCreatedDomainEvent.isMe(event)) {
        battle = BattleCreatedDomainEvent.fromBattlefieldInternalEvent(event).toBattle();
      } else if (BattleTroopReturnedDomainEvent.isMe(event)) {
      } else {
        throw Error(
          `Unknown event [${event.id}] for battle materialization with name ${event.name}`
        );
      }
    }
    battle.pullDomainEvents();
    return battle;
  }
}
