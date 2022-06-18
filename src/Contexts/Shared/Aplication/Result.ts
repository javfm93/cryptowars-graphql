import { DomainError } from '../../CryptoWars/Users/Domain/Errors/DomainError';

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

export const success = <S, F>(l: S): Either<S, F> => new Success(l);
export const failure = <S, F>(a: F): Either<S, F> => new Failure<S, F>(a);

export class Result<T> {
  public isSuccess: boolean;
  public isFailure: boolean;
  public error: DomainError | undefined;
  private readonly _value: T | undefined;

  private constructor(isSuccess: boolean, error?: DomainError, value?: T) {
    if (isSuccess && error) {
      throw new Error(`InvalidOperation: A result cannot be
        successful and contain an error`);
    }
    if (!isSuccess && !error) {
      throw new Error(`InvalidOperation: A failing result
        needs to contain an error message`);
    }

    this.isSuccess = isSuccess;
    this.isFailure = !isSuccess;
    this.error = error;
    this._value = value;

    Object.freeze(this);
  }

  public getValue(): T {
    if (!this.isSuccess || !this._value) {
      throw new Error(`Cant retrieve the value from a failed result.`);
    }

    return this._value;
  }

  public static ok<U>(value?: U): Result<U> {
    return new Result<U>(true, undefined, value);
  }

  public static fail<U>(error?: DomainError): Result<U> {
    return new Result<U>(false, error);
  }

  public static combine(results: Result<any>[]): Result<any> {
    for (const result of results) {
      if (result.isFailure) {
        return result;
      }
    }
    return Result.ok<any>();
  }
}
