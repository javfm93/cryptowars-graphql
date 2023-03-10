import { ContainerBuilder, Definition } from 'node-dependency-injection';
import { DomainEvent } from '../../domain/DomainEvent';
import { DomainEventHandler } from '../../Domain/DomainEventHandler';

export class DomainEventSubscribers {
  constructor(public items: Array<DomainEventHandler<DomainEvent<Record<string, unknown>>>>) {}

  static from(container: ContainerBuilder): DomainEventSubscribers {
    const subscriberDefinitions = container.findTaggedServiceIds('domainEventSubscriber') as Map<
      String,
      Definition
    >;
    const subscribers: Array<DomainEventHandler<DomainEvent<Record<string, unknown>>>> = [];

    subscriberDefinitions.forEach((value: Definition, key: String) => {
      const domainEventSubscriber = container.get<
        DomainEventHandler<DomainEvent<Record<string, unknown>>>
      >(key.toString());
      subscribers.push(domainEventSubscriber);
    });

    return new DomainEventSubscribers(subscribers);
  }
}
