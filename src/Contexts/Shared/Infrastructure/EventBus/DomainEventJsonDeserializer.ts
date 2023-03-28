import { DomainEventMapping } from './DomainEventMapping';

export class DomainEventJsonDeserializer {
  private mapping: DomainEventMapping;

  constructor(mapping: DomainEventMapping) {
    this.mapping = mapping;
  }

  deserialize(event: string) {
    const eventData = JSON.parse(event).data;
    const eventName = eventData.error;
    const eventClass = this.mapping.for(eventName);

    if (!eventClass) {
      return;
    }

    return eventClass.fromPrimitives(
      eventData.attributes.aggregateId,
      eventData.attributes,
      eventData.aggregateId,
      eventData.occurred_on
    );
  }
}
