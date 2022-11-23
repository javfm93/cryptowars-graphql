import { DomainEvent } from '../../../../src/Contexts/Shared/Domain/DomainEvent';
import { DomainEventSubscriber } from '../../../../src/Contexts/Shared/Domain/DomainEventSubscriber';
import { Uuid } from '../../../../src/Contexts/Shared/Domain/value-object/Uuid';
import { InMemoryAsyncEventBus } from '../../../../src/Contexts/Shared/Infrastructure/EventBus/InMemory/InMemoryAsyncEventBus';
import { Primitives } from '../../../../src/Contexts/Shared/Domain/Primitives';

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

    eventBus = new InMemoryAsyncEventBus([subscriber]);

    eventBus.publish([event]);
  });
});

class DummyEvent extends DomainEvent {
  static EVENT_NAME = 'dummy:event';

  constructor(id: string) {
    super(DummyEvent.EVENT_NAME, id);
  }

  toPrimitive(): Primitives<DummyEvent> {
    throw new Error('Method not implemented.');
  }
}

class DomainEventSubscriberDummy implements DomainEventSubscriber<DummyEvent> {
  subscribedTo(): any[] {
    return [DummyEvent];
  }

  async on(domainEvent: DummyEvent) {
    console.log(domainEvent);
  }
}
