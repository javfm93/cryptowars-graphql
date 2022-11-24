import { Uuid } from '../../../Shared/Domain/value-object/Uuid';
import { Entity } from '../../../Shared/Domain/Entity';
import { BattlefieldExposedEvent } from './BattlefieldExposedEvent';

export abstract class AggregateRoot<T> extends Entity<T> {
  private domainEvents: Array<BattlefieldExposedEvent<Record<string, unknown>>>;

  protected constructor(id: Uuid, props: T) {
    super(id, props);
    this.domainEvents = [];
  }

  pullDomainEvents(): Array<BattlefieldExposedEvent<Record<string, unknown>>> {
    const domainEvents = this.domainEvents.slice();
    this.domainEvents = [];

    return domainEvents;
  }

  record(event: BattlefieldExposedEvent<Record<string, unknown>>): void {
    this.domainEvents.push(event);
  }

  abstract toPrimitives(): any;
}
