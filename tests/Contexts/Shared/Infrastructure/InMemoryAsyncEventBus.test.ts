import { DomainEvent } from '../../../../src/Contexts/Shared/Domain/DomainEvent';
import { DomainEventHandler } from '../../../../src/Contexts/Shared/Domain/DomainEventHandler';
import { Uuid } from '../../../../src/Contexts/Shared/Domain/value-object/Uuid';
import { InMemoryAsyncEventBus } from '../../../../src/Contexts/Shared/Infrastructure/EventBus/InMemory/InMemoryAsyncEventBus';

describe('InMemoryAsyncEventBus', () => {
  let subscriber: DomainEventSubscriberDummy;
  let eventBus: InMemoryAsyncEventBus;

  beforeAll(() => {});

  it('the subscriber should be called when the event it is subscribed to is published', done => {
    const event = new DummyEvent(Uuid.random().value);
    subscriber = new DomainEventSubscriberDummy();
    subscriber.on = async () => {
      done();
    };

    eventBus = new InMemoryAsyncEventBus();
    eventBus.addSubscribers([subscriber]);

    eventBus.publish([event]);
  });
});

class DummyEvent extends DomainEvent<any> {
  static TYPE = 'dummy:event';

  constructor(id: string) {
    super(DummyEvent.TYPE, id);
  }
}

class DomainEventSubscriberDummy implements DomainEventHandler<DummyEvent> {
  subscribedTo(): any[] {
    return [DummyEvent];
  }

  async on(domainEvent: DummyEvent) {
    console.log(domainEvent);
  }
}
