import { ValueObject } from '../../../Shared/Domain/ValueObject';
import { TownSoldiersPrimitives } from '../../../CryptoWars/Towns/domain/TownSoldiers';

export enum SquadTypes {
  basic = 'basic'
}

export type SquadsPrimitives = Array<SquadPrimitives>;
export type SquadPrimitives = {
  type: SquadTypes;
  soldiers: number;
};

export class Squads extends ValueObject<Squads> {
  private constructor(readonly value: SquadsPrimitives) {
    super();
  }

  public static defaultSquads(): Squads {
    const fromSquadTypeToSquad = (squadType: SquadTypes): SquadPrimitives => ({
      type: squadType,
      soldiers: 0
    });
    return new Squads(Object.values(SquadTypes).map(fromSquadTypeToSquad));
  }

  public static fromPrimitives(squads: SquadsPrimitives): Squads {
    return new Squads(squads);
  }

  public static fromTownSoldiers(townSoldiers: TownSoldiersPrimitives): SquadPrimitives {
    function isValidSquadType(squadType: string): squadType is SquadTypes {
      return Object.keys(SquadTypes).includes(squadType);
    }

    const townSoldiersTypes = Object.keys(townSoldiers);
    if (!townSoldiersTypes.length) throw Error(`Not town soldier type supplied`);
    const type = townSoldiersTypes[0];
    if (isValidSquadType(type)) return { type, soldiers: townSoldiers.basic };
    else throw Error(`town soldier type not supported: ${type}`);
  }

  get basic(): SquadPrimitives {
    const basicSquad = this.value.filter(squad => squad.type === SquadTypes.basic).pop();
    return basicSquad ?? { type: SquadTypes.basic, soldiers: 0 };
  }

  public absorb(newSquad: SquadPrimitives) {
    this.value.forEach(squad => {
      if (squad.type === newSquad.type) {
        squad.soldiers += newSquad.soldiers;
      }
    });
  }

  public isEqualTo(squads?: Squads) {
    return this.toString() === squads?.toString();
  }

  public toString(): string {
    return JSON.stringify(this.value);
  }
}
