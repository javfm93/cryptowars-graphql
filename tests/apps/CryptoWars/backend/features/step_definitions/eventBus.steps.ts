import { EventBus } from '../../../../../../src/Contexts/Shared/Domain/EventBus';
import { DomainEventJsonDeserializer } from '../../../../../../src/Contexts/Shared/Infrastructure/EventBus/DomainEventJsonDeserializer';
import { DomainEventMapping } from '../../../../../../src/Contexts/Shared/Infrastructure/EventBus/DomainEventMapping';
import { Given } from '@cucumber/cucumber';
import {
  ComponentTags,
  DependencyInjector
} from '../../../../../../src/apps/CryptoWars/backend/dependency-injection/dependencyInjector';

Given('I send an event to the event bus:', async (event: any) => {
  const deserializer = buildDeserializer();
  const domainEvent = deserializer.deserialize(event);
  const eventBus = DependencyInjector.get(EventBus);
  await eventBus.publish([domainEvent!]);
});

function buildDeserializer() {
  const domainEventMapping = new DomainEventMapping(
    DependencyInjector.getByTag(ComponentTags.domainEventHandler)
  );

  return new DomainEventJsonDeserializer(domainEventMapping);
}
