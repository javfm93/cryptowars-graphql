import { DomainEvent } from '../../../Shared/Domain/DomainEvent';
import { BattlefieldDomainEvent, BattlefieldEvent } from '../../Shared/Domain/BattlefieldEvent';
import { Uuid } from '../../../Shared/Domain/value-object/Uuid';

type ArmyCreatedDomainEventBody = {
  readonly eventName: string;
  readonly id: string;
};

export class ArmyCreatedDomainEvent extends BattlefieldDomainEvent {
  static readonly EVENT_NAME = 'battlefield.1.event.army.created';

  constructor({ id, eventId, occurredOn }: { id: string; eventId?: string; occurredOn?: Date }) {
    super(ArmyCreatedDomainEvent.EVENT_NAME, id, eventId, occurredOn);
  }

  toPrimitive(): ArmyCreatedDomainEventBody {
    const { aggregateId } = this;
    return {
      eventName: ArmyCreatedDomainEvent.EVENT_NAME,
      id: aggregateId
    };
  }

  toBattlefieldEvent(): BattlefieldEvent {
    return new BattlefieldEvent(new Uuid(this.eventId), {
      aggregateId: this.aggregateId,
      version: 0,
      eventName: this.eventName,
      data: {}
    });
  }

  static fromPrimitives(aggregateId: string, eventId: string, occurredOn: Date): DomainEvent {
    return new ArmyCreatedDomainEvent({
      id: aggregateId,
      eventId,
      occurredOn
    });
  }
}
