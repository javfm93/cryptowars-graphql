import { DomainEvent } from '../../../Shared/Domain/DomainEvent';

type ArmyCreatedDomainEventBody = {
  readonly eventName: string;
  readonly id: string;
};

export class ArmyCreatedDomainEvent extends DomainEvent {
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

  static fromPrimitives(aggregateId: string, eventId: string, occurredOn: Date): DomainEvent {
    return new ArmyCreatedDomainEvent({
      id: aggregateId,
      eventId,
      occurredOn
    });
  }
}
