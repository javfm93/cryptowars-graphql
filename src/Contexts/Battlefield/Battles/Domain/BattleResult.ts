import { ValueObject } from '../../../Shared/Domain/ValueObject';
import { Squads } from '../../Armies/Domain/Squads';
import { Primitives } from '../../../Shared/Domain/Primitives';
import { ArmyTroop } from './ArmyTroop';

export class BattleResult extends ValueObject<BattleResult> {
  private constructor(
    readonly winner: 'attacker' | 'defender',
    readonly attackerCasualties: Squads,
    readonly defenderCasualties: Squads,
    readonly returningTroop: ArmyTroop
  ) {
    super();
  }

  public static fromPrimitives(primitives: Primitives<BattleResult>): BattleResult {
    return new BattleResult(
      primitives.winner === 'attacker' ? 'attacker' : 'defender',
      Squads.fromPrimitives(primitives.attackerCasualties),
      Squads.fromPrimitives(primitives.defenderCasualties),
      ArmyTroop.fromPrimitives(primitives.returningTroop)
    );
  }

  public toPrimitives(): Primitives<BattleResult> {
    return {
      winner: this.winner,
      attackerCasualties: this.attackerCasualties.value,
      defenderCasualties: this.defenderCasualties.value,
      returningTroop: this.returningTroop.toPrimitives()
    };
  }

  public isEqualTo(toCompare?: BattleResult) {
    return this.toString() === toCompare?.toString();
  }

  public toString(): string {
    return JSON.stringify(this.toPrimitives());
  }
}
