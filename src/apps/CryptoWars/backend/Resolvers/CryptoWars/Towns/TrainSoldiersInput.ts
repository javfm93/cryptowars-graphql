import { Field, InputType } from 'type-graphql';
import { TownSoldierTypes } from '../../../../../../Contexts/CryptoWars/Towns/Domain/TownSoldier';
import { TownSoldiersPrimitives } from '../../../../../../Contexts/CryptoWars/Towns/Domain/TownSoldiers';
import { IsUUID } from 'class-validator';

@InputType()
export class TrainSoldiersInput {
  @Field()
  @IsUUID()
  townId!: string;

  @Field(type => TownSoldiers)
  soldiers!: TownSoldiersPrimitives;
}

@InputType()
export class TownSoldiers {
  @Field()
  [TownSoldierTypes.basic]!: number;

  @Field()
  [TownSoldierTypes.range]!: number;
}
