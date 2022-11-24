import { DomainEvent, OptionalDomainEventProps } from '../../../Shared/Domain/DomainEvent';
import { Optional, Primitives } from '../../../Shared/Domain/Primitives';
import { TaskEventToTrigger } from './TaskEventToTrigger';
import { Uuid } from '../../../Shared/Domain/value-object/Uuid';

type Props = Optional<OptionalDomainEventProps<TaskRequestedDomainEvent>, 'aggregateId'>;

type Attributes = {
  triggerAt: number;
  eventToTrigger: Primitives<TaskEventToTrigger>;
};

export class TaskRequestedDomainEvent extends DomainEvent<Attributes> {
  static readonly TYPE = 'scheduler.1.event.task.requested';

  constructor(props: Props) {
    const { id, occurredOn, attributes, meta } = props;
    const aggregateId = Uuid.random().toString();
    super(TaskRequestedDomainEvent.TYPE, aggregateId, attributes, meta, occurredOn, id);
  }

  static fromPrimitives(
    primitives: Primitives<TaskRequestedDomainEvent>
  ): TaskRequestedDomainEvent {
    return new TaskRequestedDomainEvent(primitives);
  }
}
