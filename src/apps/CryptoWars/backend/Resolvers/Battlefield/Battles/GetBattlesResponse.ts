import { Field, ID, ObjectType, registerEnumType } from 'type-graphql';
import {
  ArmySchema,
  Squads
} from '../../../../../../Contexts/Battlefield/Armies/Infrastructure/Persistence/ArmySchema';
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
  squads!: Squads;
}

@ObjectType()
class BattleResult {
  @Field(type => BattleWinner)
  winner!: BattleWinner;
  @Field(type => Squads)
  attackerCasualties!: Squads;
  @Field(type => Squads)
  defenderCasualties!: Squads;
  @Field(type => ArmyTroop)
  returningTroop!: ArmyTroop;
}

@ObjectType()
class Attack {
  @Field(type => ID)
  id!: string;

  @Field(type => ArmyTroop)
  attackerTroop!: ArmyTroop;

  @Field()
  defenderArmyId!: string;

  @Field()
  sentAt!: string;
}

@ObjectType()
class Battle {
  @Field(type => ID)
  id!: string;

  @Field(type => Attack)
  attack!: Attack;

  @Field(type => ArmySchema)
  defenderArmy!: ArmySchema;

  @Field()
  finishedAt!: string;

  @Field(type => BattleResult)
  result!: BattleResult;
}

registerEnumType(BattleWinner, {
  name: 'BattleWinner'
});
