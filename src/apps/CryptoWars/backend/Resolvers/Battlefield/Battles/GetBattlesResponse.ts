import { Field, ObjectType, registerEnumType } from 'type-graphql';
import { SquadsPrimitives } from '../../../../../../Contexts/Battlefield/Armies/Domain/Squads';
import { Squads } from '../../../../../../Contexts/Battlefield/Armies/Infrastructure/Persistence/ArmySchema';
import { BattleWinner } from '../../../../../../Contexts/Battlefield/Battles/Domain/BattleResult';

@ObjectType()
export class Battles {
  @Field(type => [Battle])
  battles!: Array<Battle>;
}

@ObjectType()
class ArmyTroop {
  @Field()
  armyId!: string;
  @Field(type => Squads)
  squads!: SquadsPrimitives;
}

@ObjectType()
class BattleResult {
  @Field(type => BattleWinner)
  winner!: BattleWinner;
  @Field(type => Squads)
  attackerCasualties!: SquadsPrimitives;
  @Field(type => Squads)
  defenderCasualties!: Squads;
  @Field(type => ArmyTroop)
  returningTroop!: ArmyTroop;
}

@ObjectType()
class Battle {
  @Field()
  finishedAt!: string;

  @Field(type => BattleResult)
  result!: BattleResult;
}

registerEnumType(BattleWinner, {
  name: 'BattleWinner'
});
