import { BattleId } from './BattleId';
import { AggregateRoot } from '../../Shared/Domain/FlatAggregateRoot';
import { Army } from '../../Armies/Domain/Army';
import { Primitives } from '../../../Shared/Domain/Primitives';
import { BattleCreatedDomainEvent } from './BattleCreatedDomainEvent';
import { SquadTypes } from '../../Armies/Domain/Squads';
import { TownSoldiersPrimitives } from '../../../CryptoWars/Towns/domain/TownSoldiers';
import { BattlefieldInternalEvent } from '../../Shared/Domain/BattlefieldInternalEvent';
import { Uuid } from '../../../Shared/Domain/value-object/Uuid';
import { Attack } from '../../Attacks/Domain/Attack';

export type BattleResult = {
  winner: 'attacker' | 'defender';
  attackerCasualties: TownSoldiersPrimitives;
  defenderCasualties: TownSoldiersPrimitives;
};

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
        result: battle.result
      })
    );
    return battle;
  }

  private resolve(): BattleResult {
    const attackerSoldiers = this.attack.attackerTroop.squads.basic.soldiers;
    const defenderSoldiers = this.defenderArmy.squads.basic.soldiers;
    return attackerSoldiers > defenderSoldiers
      ? {
          winner: 'attacker',
          attackerCasualties: { [SquadTypes.basic]: defenderSoldiers },
          defenderCasualties: { [SquadTypes.basic]: defenderSoldiers }
        }
      : {
          winner: 'defender',
          attackerCasualties: { [SquadTypes.basic]: attackerSoldiers },
          defenderCasualties: { [SquadTypes.basic]: attackerSoldiers }
        };
  }

  toPrimitives(): Primitives<Battle> {
    return {
      id: this.id.toString(),
      attack: this.attack.toPrimitives(),
      defenderArmy: this.defenderArmy.toPrimitives(),
      finishedAt: this.finishedAt,
      result: this.result
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
      } else {
        throw Error(`Unknown event for battle materialization: ${event.id}: ${event.name}`);
      }
    }
    battle.pullDomainEvents();
    return battle;
  }
}
