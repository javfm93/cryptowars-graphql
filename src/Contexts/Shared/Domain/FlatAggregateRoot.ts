import { Entity } from './FlatEntity';
import { DomainEvent } from './DomainEvent';
import { Uuid } from './value-object/Uuid';

export abstract class AggregateRoot extends Entity {
  private domainEvents: Array<DomainEvent>;

  constructor(id: Uuid) {
    super(id);
    this.domainEvents = [];
  }

  pullDomainEvents(): Array<DomainEvent> {
    const domainEvents = this.domainEvents.slice();
    this.domainEvents = [];

    return domainEvents;
  }

  record(event: DomainEvent): void {
    this.domainEvents.push(event);
  }

  abstract toPrimitives(): any;
}
