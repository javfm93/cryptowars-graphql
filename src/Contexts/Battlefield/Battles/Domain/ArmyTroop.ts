import { ValueObject } from '../../../Shared/Domain/ValueObject';
import { Squads } from '../../Armies/Domain/Squads';
import { ArmyId } from '../../Armies/Domain/ArmyId';
import { Primitives } from '../../../Shared/Domain/Primitives';
import { TownSoldiersPrimitives } from '../../../CryptoWars/Towns/domain/TownSoldiers';

export class ArmyTroop extends ValueObject<ArmyTroop> {
  private constructor(readonly armyId: ArmyId, readonly squads: Squads) {
    super();
  }

  public static create(armyId: string, soldiers: TownSoldiersPrimitives): ArmyTroop {
    const squads = Squads.fromTownSoldiers(soldiers); // todo: convert this to a result
    return new ArmyTroop(ArmyId.create(armyId), squads);
  }

  public static fromPrimitives(primitives: Primitives<ArmyTroop>): ArmyTroop {
    return new ArmyTroop(
      ArmyId.create(primitives.armyId),
      Squads.fromPrimitives(primitives.squads)
    );
  }

  public toPrimitives(): Primitives<ArmyTroop> {
    return {
      armyId: this.armyId.toString(),
      squads: this.squads.value
    };
  }

  public isEqualTo(armyTroop?: ArmyTroop) {
    return this.toString() === armyTroop?.toString();
  }

  public toString(): string {
    return JSON.stringify(this.toPrimitives());
  }
}
