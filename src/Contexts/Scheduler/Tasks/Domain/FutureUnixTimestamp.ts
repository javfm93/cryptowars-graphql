import { ValueObject } from '../../../Shared/Domain/ValueObject';
import { Result, failure, successAndReturn } from '../../../Shared/Aplication/Result';
import { InvalidTime } from './InvalidTime';

export class FutureUnixTimestamp extends ValueObject<FutureUnixTimestamp> {
  private constructor(readonly value: number) {
    super();
  }

  public static create(time: number): Result<FutureUnixTimestamp, InvalidTime> {
    if (time <= Date.now()) return failure(new InvalidTime(time));
    return successAndReturn(new FutureUnixTimestamp(time));
  }

  public static fromPrimitives(time: number): FutureUnixTimestamp {
    return new FutureUnixTimestamp(time);
  }

  public isEqualTo(toCompare?: FutureUnixTimestamp) {
    return this.toString() === toCompare?.toString();
  }

  public toString(): string {
    return this.value.toString();
  }

  public toIso(): string {
    return new Date(this.value).toISOString();
  }
}
