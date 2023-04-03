import { Field, ObjectType } from 'type-graphql';
import { TownPrimitives } from '../../../../../../Contexts/CryptoWars/Towns/Domain/Town';
import { TownSchema } from '../../../../../../Contexts/CryptoWars/Towns/Infrastructure/TownSchema';

@ObjectType()
export class Towns {
  @Field(type => [TownSchema])
  towns!: Array<TownPrimitives>;
}
