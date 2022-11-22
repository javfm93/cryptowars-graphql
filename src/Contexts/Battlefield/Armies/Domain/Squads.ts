import { ValueObject } from '../../../Shared/Domain/ValueObject';
import { Either, failure, successAndReturn } from '../../../Shared/Aplication/Result';
import { InvalidSquad } from './InvalidSquad';

export enum SquadTypes {
  basic = 'basic'
}

export type SquadsPrimitives = {
  [key in SquadTypes]: number;
};

export class Squads extends ValueObject<Squads> {
  private constructor(readonly value: SquadsPrimitives) {
    super();
  }

  public static defaultSquads(): Squads {
    return new Squads({ [SquadTypes.basic]: 0 });
  }

  public static fromPrimitives(squads: SquadsPrimitives): Squads {
    return new Squads(squads);
  }

  public static create(squadsPrimitives: SquadsPrimitives): Either<Squads, InvalidSquad> {
    if (!squadsPrimitives) return failure(new InvalidSquad('Squad not provided'));
    const squadsToCreate = Object.entries(squadsPrimitives);
    for (const squadToCreate of squadsToCreate) {
      const [squad, numberOfSoldiers] = squadToCreate;
      if (!Object.keys(SquadTypes).includes(squad)) {
        return failure(new InvalidSquad(`Invalid squad: ${squad}`));
      }
      if (numberOfSoldiers < 1) {
        return failure(new InvalidSquad(`Invalid number of soldiers for squad ${squad}`));
      }
    }
    return successAndReturn(new Squads(squadsPrimitives));
  }

  public absorb(newSquads: Squads) {
    this.value.basic += newSquads.value.basic;
  }

  public reduce(squads: Squads) {
    this.value.basic -= squads.value.basic;
  }

  public thereAreEnoughSoldiersToCreate(subSquads: Squads): boolean {
    return this.value.basic >= subSquads.value.basic;
  }

  public isEqualTo(squads?: Squads) {
    return this.toString() === squads?.toString();
  }

  public toString(): string {
    return JSON.stringify(this.value);
  }
}
