import { Field, InputType } from 'type-graphql';
import { IsUUID } from 'class-validator';
import { SquadTypes } from '../../../../../../Contexts/Battlefield/Armies/Domain/Squads';

@InputType()
export class SquadsInput {
  @Field()
  [SquadTypes.basic]!: number;

  @Field()
  [SquadTypes.range]!: number;
}

@InputType()
export class SendAttackInput {
  @Field()
  @IsUUID()
  id!: string;

  @Field()
  @IsUUID()
  attackerArmy!: string;

  @Field()
  @IsUUID()
  defenderTown!: string;

  @Field(type => SquadsInput)
  soldiers!: SquadsInput;
}
