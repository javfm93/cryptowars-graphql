import { ValueObject } from '../../../Shared/Domain/ValueObject';
import { Squads, SquadsPrimitives } from '../../Armies/Domain/Squads';
import { ArmyId } from '../../Armies/Domain/ArmyId';
import { Primitives } from '../../../Shared/Domain/Primitives';
import { Either, failure, successAndReturn } from '../../../Shared/Aplication/Result';
import { InvalidSquad } from '../../Armies/Domain/InvalidSquad';

export class ArmyTroop extends ValueObject<ArmyTroop> {
  private constructor(readonly armyId: ArmyId, readonly squads: Squads) {
    super();
  }

  public static create(
    armyId: string,
    squadsPrimitives: SquadsPrimitives
  ): Either<ArmyTroop, InvalidSquad> {
    const squads = Squads.create(squadsPrimitives);
    if (squads.isFailure()) return failure(squads.value);
    return successAndReturn(new ArmyTroop(ArmyId.create(armyId), squads.value));
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
