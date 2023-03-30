import { DomainError } from '../Domain/Errors/DomainError';

export type Result<S, F> = Success<S, F> | Failure<S, F>;
export type ErrorsOf<T> = T extends Result<any, infer E> ? E : never;

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

export const success = <F>(): Result<Nothing, F> => new Success(undefined);
export const successAndReturn = <S, F>(l: S): Result<S, F> => new Success(l);
export const failure = <S, F>(a: F): Result<S, F> => new Failure<S, F>(a);

export type Nothing = void;
export type CommandResult<CommandErrors extends DomainError> = Result<Nothing, CommandErrors>;
