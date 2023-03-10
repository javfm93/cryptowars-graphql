import { EventBus } from '../../../../src/Contexts/Shared/Domain/EventBus';
import { DomainEvent } from '../../../../src/Contexts/Shared/Domain/DomainEvent';
import { DomainEventHandler } from '../../../../src/Contexts/Shared/Domain/DomainEventHandler';
import { DomainEventMapping } from '../../../../src/Contexts/Shared/Infrastructure/EventBus/DomainEventMapping';

export default class EventBusMock implements EventBus {
  private publishSpy = jest.fn();

  async publish(events: DomainEvent<any>[]) {
    this.publishSpy(events);
  }

  async start(): Promise<void> {}

  addSubscribers(subscribers: DomainEventHandler<DomainEvent<any>>[]): void {}

  setDomainEventMapping(domainEventMapping: DomainEventMapping): void {}

  expectLastPublishedEventToBe(expectedEvent: DomainEvent<any>) {
    const publishSpyCalls = this.publishSpy.mock.calls;

    expect(publishSpyCalls.length).toBeGreaterThan(0);

    const lastPublishSpyCall = publishSpyCalls[publishSpyCalls.length - 1];
    const lastPublishedEvent = lastPublishSpyCall[0][lastPublishSpyCall[0].length - 1];

    expect(this.getDataFromDomainEvent(expectedEvent)).toMatchObject(
      this.getDataFromDomainEvent(lastPublishedEvent)
    );
  }

  expectPublishedEventsToBe(expectedEvents: DomainEvent<any>[]) {
    expect(this.publishSpy).toBeCalledWith(expectedEvents);
  }

  expectEventsNotToBePublished() {
    const publishSpyCalls = this.publishSpy.mock.calls;
    expect(publishSpyCalls.length).toBe(0);
  }

  resetMock() {
    this.publishSpy.mockReset();
  }

  private getDataFromDomainEvent(event: DomainEvent<any>) {
    const { id, occurredOn, ...attributes } = event;

    return attributes;
  }
}
