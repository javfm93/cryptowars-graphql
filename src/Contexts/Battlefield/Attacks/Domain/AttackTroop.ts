import { ValueObject } from '../../../Shared/Domain/ValueObject';
import { Squads, SquadsPrimitives } from '../../Armies/Domain/Squads';
import { ArmyId } from '../../Armies/Domain/ArmyId';
import { Primitives } from '../../../Shared/Domain/Primitives';
import { Result, failure, successAndReturn } from '../../../Shared/Aplication/Result';
import { InvalidSquad } from '../../Armies/Domain/InvalidSquad';

export class AttackTroop extends ValueObject<AttackTroop> {
  private constructor(readonly armyId: ArmyId, readonly squads: Squads) {
    super();
  }

  public static create(
    armyId: string,
    soldiers: SquadsPrimitives
  ): Result<AttackTroop, InvalidSquad> {
    const squads = Squads.create(soldiers);
    if (squads.isFailure()) return failure(squads.value);
    return successAndReturn(new AttackTroop(ArmyId.create(armyId), squads.value));
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
