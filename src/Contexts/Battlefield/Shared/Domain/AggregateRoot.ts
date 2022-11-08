import { BattlefieldDomainEvent } from './BattlefieldEvent';
import { Uuid } from '../../../Shared/Domain/value-object/Uuid';
import { Entity } from '../../../Shared/Domain/Entity';

export abstract class AggregateRoot<T> extends Entity<T> {
  private domainEvents: Array<BattlefieldDomainEvent>;

  protected constructor(id: Uuid, props: T) {
    super(id, props);
    this.domainEvents = [];
  }

  pullDomainEvents(): Array<BattlefieldDomainEvent> {
    const domainEvents = this.domainEvents.slice();
    this.domainEvents = [];

    return domainEvents;
  }

  record(event: BattlefieldDomainEvent): void {
    this.domainEvents.push(event);
  }

  abstract toPrimitives(): any;
}
