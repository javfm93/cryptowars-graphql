type DomainErrorConstructor = new (message: string) => DomainError;

export abstract class DomainError extends Error {
  protected constructor(message: string) {
    super(message);
  }

  public abstract errorName(): string;

  public isEqualTo(error: DomainErrorConstructor): boolean {
    return this.errorName() === error.prototype.errorName();
  }
}
