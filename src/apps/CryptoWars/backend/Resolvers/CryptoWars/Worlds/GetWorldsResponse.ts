import { Field, ObjectType } from 'type-graphql';
import { Worlds } from '../../../../../../Contexts/CryptoWars/Worlds/Domain/Worlds';
import { WorldSchema } from '../../../../../../Contexts/CryptoWars/Worlds/Infrastructure/Persistence/WorldSchema';
import { Primitives } from '../../../../../../Contexts/Shared/Domain/Primitives';

@ObjectType('Worlds')
export class WorldsResponse {
  @Field(type => [WorldSchema])
  worlds!: Primitives<Worlds>;
}
