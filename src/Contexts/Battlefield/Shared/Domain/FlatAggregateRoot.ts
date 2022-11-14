import { BattlefieldExposedEvent } from './BattlefieldExposedEvent';
import { Entity } from './FlatEntity';
import { Uuid } from '../../../Shared/Domain/value-object/Uuid';

export abstract class AggregateRoot extends Entity {
  private domainEvents: Array<BattlefieldExposedEvent>;

  constructor(id: Uuid) {
    super(id);
    this.domainEvents = [];
  }

  pullDomainEvents(): Array<BattlefieldExposedEvent> {
    const domainEvents = this.domainEvents.slice();
    this.domainEvents = [];

    return domainEvents;
  }

  record(event: BattlefieldExposedEvent): void {
    this.domainEvents.push(event);
  }

  abstract toPrimitives(): any;
}
