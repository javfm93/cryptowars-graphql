import { Field, ObjectType } from 'type-graphql';
import { Town } from './GetPlayerTownResponse';

@ObjectType()
export class Towns {
  @Field(type => [Town])
  towns!: Array<Town>;
}
