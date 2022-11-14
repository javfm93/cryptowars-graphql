import { ValueObject } from '../../../Shared/Domain/ValueObject';
import { Squads } from '../../Armies/Domain/Squads';
import { ArmyId } from '../../Armies/Domain/ArmyId';
import { Primitives } from '../../../Shared/Domain/Primitives';
import { TownSoldiersPrimitives } from '../../../CryptoWars/Towns/domain/TownSoldiers';

export class AttackTroop extends ValueObject<AttackTroop> {
  private constructor(readonly armyId: ArmyId, readonly squads: Squads) {
    super();
  }

  public static create(armyId: string, soldiers: TownSoldiersPrimitives): AttackTroop {
    const squads = Squads.fromTownSoldiers(soldiers); // todo: convert this to a result
    return new AttackTroop(ArmyId.create(armyId), squads);
  }

  public static fromPrimitives(primitives: Primitives<AttackTroop>): AttackTroop {
    return new AttackTroop(
      ArmyId.create(primitives.armyId),
      Squads.fromPrimitives(primitives.squads)
    );
  }

  public toPrimitives(): Primitives<AttackTroop> {
    return {
      armyId: this.armyId.toString(),
      squads: this.squads.value
    };
  }

  public isEqualTo(armyTroop?: AttackTroop) {
    return this.toString() === armyTroop?.toString();
  }

  public toString(): string {
    return JSON.stringify(this.toPrimitives());
  }
}
