import { DomainEvent, OptionalDomainEventProps } from '../../../Shared/Domain/DomainEvent';
import { Primitives } from '../../../Shared/Domain/Primitives';

export class TaskCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'scheduler.1.event.task.created';

  constructor(props: OptionalDomainEventProps<TaskCreatedDomainEvent>) {
    const { aggregateId, eventId, occurredOn } = props;
    super(TaskCreatedDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn);
  }

  toPrimitive(): Primitives<TaskCreatedDomainEvent> {
    return {
      eventName: TaskCreatedDomainEvent.EVENT_NAME,
      aggregateId: this.aggregateId,
      eventId: this.eventId,
      occurredOn: this.occurredOn
    };
  }

  static fromPrimitives(primitives: Primitives<TaskCreatedDomainEvent>): DomainEvent {
    return new TaskCreatedDomainEvent(primitives);
  }
}
