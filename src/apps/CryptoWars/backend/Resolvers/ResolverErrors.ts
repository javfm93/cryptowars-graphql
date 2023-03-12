import { Field, InterfaceType, ObjectType } from 'type-graphql';

@InterfaceType()
abstract class BaseError {
  @Field()
  type!: string;
  @Field()
  message!: string;
  @Field()
  status!: number;
}

@ObjectType({ implements: BaseError })
export class InvalidInputError implements BaseError {
  readonly type = 'invalidInput';
  readonly status = 400;

  constructor(public readonly message: string) {}
}

@ObjectType({ implements: BaseError })
export class NotFoundError implements BaseError {
  readonly type = 'notFound';
  readonly status = 404;

  constructor(public readonly message: string) {}
}

@ObjectType({ implements: BaseError })
export class ConflictError implements BaseError {
  readonly type = 'conflict';
  readonly status = 409;

  constructor(public readonly message: string) {}
}
