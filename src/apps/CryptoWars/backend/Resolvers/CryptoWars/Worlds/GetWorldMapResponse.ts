import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType('WorldMap')
export class WorldMapResponse {
  @Field(() => ID)
  id!: string;

  @Field()
  name!: string;

  @Field(type => [WorldTown])
  towns!: Array<WorldTown>;
}

@ObjectType('WorldTown')
export class WorldTown {
  @Field(() => ID)
  id!: string;

  @Field()
  playerId!: string;
}
