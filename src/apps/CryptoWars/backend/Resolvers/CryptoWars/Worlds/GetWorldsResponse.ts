import { WorldPrimitives } from '../../../../../../Contexts/CryptoWars/Worlds/Domain/World';
import { Field, ObjectType } from 'type-graphql';
import { WorldSchema } from '../../../../../../Contexts/CryptoWars/Worlds/Infrastructure/Persistence/WorldSchema';

export type GetWorldsResponse = {
  worlds: Array<WorldPrimitives>;
};

@ObjectType('Worlds')
export class WorldsResponse {
  @Field(type => [WorldSchema])
  worlds!: Array<WorldPrimitives>;
}
