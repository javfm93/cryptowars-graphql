import { DomainEvent, OptionalDomainEventProps } from '../../../Shared/Domain/DomainEvent';
import { Primitives } from '../../../Shared/Domain/Primitives';

export class TaskCreatedDomainEvent extends DomainEvent<{}> {
  static readonly TYPE = 'scheduler.1.event.task.created';

  constructor(props: OptionalDomainEventProps<TaskCreatedDomainEvent>) {
    const { aggregateId, id, occurredOn, attributes, meta } = props;
    super(TaskCreatedDomainEvent.TYPE, aggregateId, attributes, meta, occurredOn, id);
  }

  static fromPrimitives(primitives: Primitives<TaskCreatedDomainEvent>): TaskCreatedDomainEvent {
    return new TaskCreatedDomainEvent(primitives);
  }
}
