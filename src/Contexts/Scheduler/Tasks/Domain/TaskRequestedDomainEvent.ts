import { DomainEvent, OptionalDomainEventProps } from '../../../Shared/Domain/DomainEvent';
import { Primitives } from '../../../Shared/Domain/Primitives';

export class TaskRequestedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'scheduler.1.event.task.requested';
  readonly triggerAt: number;
  readonly eventToTrigger: Primitives<DomainEvent>;

  constructor(props: OptionalDomainEventProps<TaskRequestedDomainEvent>) {
    const { aggregateId, eventId, occurredOn, triggerAt, eventToTrigger } = props;
    super(TaskRequestedDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn);
    this.triggerAt = triggerAt;
    this.eventToTrigger = eventToTrigger;
  }

  toPrimitive(): Primitives<TaskRequestedDomainEvent> {
    return {
      eventName: TaskRequestedDomainEvent.EVENT_NAME,
      aggregateId: this.aggregateId,
      eventId: this.eventId,
      occurredOn: this.occurredOn,
      triggerAt: this.triggerAt,
      eventToTrigger: this.eventToTrigger
    };
  }

  static fromPrimitives(primitives: Primitives<TaskRequestedDomainEvent>): DomainEvent {
    return new TaskRequestedDomainEvent(primitives);
  }
}
