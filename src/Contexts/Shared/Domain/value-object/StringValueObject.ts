export class StringValueObject {
  constructor(readonly value: string) {}

  toString(): string {
    return this.value;
  }

  public isEqualTo(stringValueObject?: StringValueObject | string) {
    return this.toString() === stringValueObject?.toString();
  }
}
