import { DomainEvent } from '../../../Shared/Domain/DomainEvent';

type CreateVillageDomainEventBody = {
  readonly eventName: string;
  readonly id: string;
};

export class VillageCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'cryptoWars.1.event.village.created';

  constructor({ id, eventId, occurredOn }: { id: string; eventId?: string; occurredOn?: Date }) {
    super(VillageCreatedDomainEvent.EVENT_NAME, id, eventId, occurredOn);
  }

  toPrimitive(): CreateVillageDomainEventBody {
    const { aggregateId } = this;
    return {
      eventName: VillageCreatedDomainEvent.EVENT_NAME,
      id: aggregateId
    };
  }

  static fromPrimitives(
    aggregateId: string,
    body: CreateVillageDomainEventBody,
    eventId: string,
    occurredOn: Date
  ): DomainEvent {
    return new VillageCreatedDomainEvent({
      id: aggregateId,
      eventId,
      occurredOn
    });
  }
}
