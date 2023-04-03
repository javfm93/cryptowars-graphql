import { Field, ObjectType } from 'type-graphql';
import { WorldPrimitives } from '../../../../../../Contexts/CryptoWars/Worlds/Domain/World';
import { WorldSchema } from '../../../../../../Contexts/CryptoWars/Worlds/Infrastructure/Persistence/WorldSchema';

@ObjectType('Worlds')
export class WorldsResponse {
  @Field(type => [WorldSchema])
  worlds!: Array<WorldPrimitives>;
}
