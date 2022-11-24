import { DomainEvent } from './DomainEvent';
import { Entity } from './Entity';
import { Uuid } from './value-object/Uuid';

export abstract class AggregateRoot<T> extends Entity<T> {
  private domainEvents: Array<DomainEvent<Record<string, unknown>>>;

  protected constructor(id: Uuid, props: T) {
    super(id, props);
    this.domainEvents = [];
  }

  pullDomainEvents(): Array<DomainEvent<Record<string, unknown>>> {
    const domainEvents = this.domainEvents.slice();
    this.domainEvents = [];

    return domainEvents;
  }

  record(event: DomainEvent<Record<string, unknown>>): void {
    this.domainEvents.push(event);
  }

  abstract toPrimitives(): any;
}
