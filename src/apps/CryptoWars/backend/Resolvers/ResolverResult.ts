import { ClassType } from 'type-graphql/dist/interfaces';
import { createUnionType, Field, ObjectType } from 'type-graphql';
import { createErrorResponse } from './ResolverErrors';

export const resolverResult = <Entity extends ClassType, Errors extends ClassType[]>(
  operationName: string,
  entity: Entity,
  errors: Errors
) => {
  createErrorResponse(operationName, errors);
  return createUnionType<readonly [Entity, ...Errors]>({
    name: operationName,
    types: () => [entity, ...errors] as const,
    resolveType: value => {
      if ('error' in value) {
        return errors.find(e => new e().error === value.error);
      } else {
        return entity;
      }
    }
  });
};

@ObjectType()
export class SuccessCommand {
  @Field()
  isSuccess: Boolean = true;
}

export const SuccessCommandResult = <Errors extends ClassType[]>(
  operationName: string,
  errors: Errors
) => resolverResult(operationName, SuccessCommand, errors);
