import { createUnionType, Field, InterfaceType, ObjectType, registerEnumType } from 'type-graphql';
import { ClassType } from 'type-graphql/dist/interfaces';

@InterfaceType()
abstract class BaseError {
  @Field(type => ErrorTypes)
  error!: ErrorTypes;
  @Field()
  message!: string;
  @Field()
  status!: number;
}

enum ErrorTypes {
  invalidInput = 'invalidInput',
  forbidden = 'forbidden',
  notFound = 'notFound',
  conflict = 'conflict',
  unexpected = 'unexpected',
  unauthorized = 'unauthorized'
}

registerEnumType(ErrorTypes, {
  name: 'ErrorTypes'
});

@ObjectType({ implements: BaseError })
export class InvalidInputError implements BaseError {
  readonly error = ErrorTypes.invalidInput;
  readonly status = 400;

  constructor(public readonly message: string) {}
}

@ObjectType({ implements: BaseError })
export class ForbiddenError implements BaseError {
  readonly error = ErrorTypes.forbidden;
  readonly status = 403;

  constructor(public readonly message: string) {}
}

@ObjectType({ implements: BaseError })
export class Unauthorized implements BaseError {
  readonly error = ErrorTypes.unauthorized;
  readonly status = 401;

  constructor(public readonly message: string) {}
}

@ObjectType({ implements: BaseError })
export class NotFoundError implements BaseError {
  readonly error = ErrorTypes.notFound;
  readonly status = 404;

  constructor(public readonly message: string) {}
}

@ObjectType({ implements: BaseError })
export class ConflictError implements BaseError {
  readonly error = ErrorTypes.conflict;
  readonly status = 409;

  constructor(public readonly message: string) {}
}

@ObjectType({ implements: BaseError })
export class UnexpectedError implements BaseError {
  readonly error = ErrorTypes.unexpected;
  readonly status = 500;

  constructor(public readonly message: string) {}
}

export const createErrorResponse = <Errors extends ClassType[]>(
  operationName: string,
  errors: Errors
) => {
  const errorUnion = createUnionType<readonly [...Errors]>({
    name: `${operationName}Errors`,
    types: () => [...errors] as const,
    resolveType: value => {
      console.log(value, errors);
      return errors.find(e => new e().error === value.error);
    }
  });
  @ObjectType(`Failed${operationName}Response`)
  class ErrorUnionType {
    @Field(type => errorUnion)
    errors!: typeof errorUnion;
  }
  return ErrorUnionType;
};
