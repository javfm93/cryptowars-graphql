import { Definition } from 'node-dependency-injection';
import container from '../../../../../../src/apps/CryptoWars/backend/dependency-injection';
import { EventBus } from '../../../../../../src/Contexts/Shared/Domain/EventBus';
import { DomainEventSubscriber } from '../../../../../../src/Contexts/Shared/Domain/DomainEventSubscriber';
import { DomainEventJsonDeserializer } from '../../../../../../src/Contexts/Shared/Infrastructure/EventBus/DomainEventJsonDeserializer';
import { DomainEventMapping } from '../../../../../../src/Contexts/Shared/Infrastructure/EventBus/DomainEventMapping';
import { DomainEvent } from '../../../../../../src/Contexts/Shared/Domain/DomainEvent';
import { Given } from '@cucumber/cucumber';

const eventBus = container.get('Shared.EventBus') as EventBus;
const deserializer = buildDeserializer();

Given('I send an event to the event bus:', async (event: any) => {
  const domainEvent = deserializer.deserialize(event);

  await eventBus.publish([domainEvent!]);
});

function buildDeserializer() {
  const subscriberDefinitions = container.findTaggedServiceIds('domainEventSubscriber') as Map<
    String,
    Definition
  >;
  const subscribers: Array<DomainEventSubscriber<DomainEvent>> = [];

  subscriberDefinitions.forEach((value: any, key: any) => subscribers.push(container.get(key)));
  const domainEventMapping = new DomainEventMapping(subscribers);

  return new DomainEventJsonDeserializer(domainEventMapping);
}
