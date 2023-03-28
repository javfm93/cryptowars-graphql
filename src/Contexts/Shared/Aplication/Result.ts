import { DomainError } from '../Domain/Errors/DomainError';

export type Either<S, F> = Success<S, F> | Failure<S, F>;

export class Success<S, F> {
  readonly value: S;

  constructor(value: S) {
    this.value = value;
  }

  isSuccess(): this is Success<S, F> {
    return true;
  }

  isFailure(): this is Failure<S, F> {
    return false;
  }
}

class Failure<S, F> {
  readonly value: F;

  constructor(value: F) {
    this.value = value;
  }

  isSuccess(): this is Success<S, F> {
    return false;
  }

  isFailure(): this is Failure<S, F> {
    return true;
  }
}

export const success = <F>(): Either<EmptyResult, F> => new Success(Result.ok());
export const successAndReturn = <S, F>(l: S): Either<S, F> => new Success(l);
export const failure = <S, F>(a: F): Either<S, F> => new Failure<S, F>(a);

export type EmptyResult = Result<void>;
export type CommandResult<CommandErrors extends DomainError> = Either<EmptyResult, CommandErrors>;

export class Result<T> {
  public isSuccess: boolean;
  public isFailure: boolean;

  private constructor(isSuccess: boolean) {
    this.isSuccess = isSuccess;
    this.isFailure = !isSuccess;

    Object.freeze(this);
  }

  public static ok<U>(): Result<U> {
    return new Result<U>(true);
  }
}
