import { ClassType } from 'type-graphql/dist/interfaces';
import { createUnionType, Field, ObjectType } from 'type-graphql';

export const resolverResult = <Entity extends ClassType, Errors extends ClassType[]>(
  resultName: string,
  entity: Entity,
  errors: Errors
) =>
  createUnionType<readonly [Entity, ...Errors]>({
    name: resultName,
    types: () => [entity, ...errors] as const,
    resolveType: value => {
      if ('status' in value && 'message' in value) {
        return errors.find(e => new e().status === value.status);
      } else {
        return entity;
      }
    }
  });

export const resolverCommandResult = <Errors extends ClassType[]>(
  resultName: string,
  ...errors: Errors
) => resolverResult(resultName, Success, errors);

@ObjectType()
export class Success {
  @Field()
  success: Boolean = true;
}
