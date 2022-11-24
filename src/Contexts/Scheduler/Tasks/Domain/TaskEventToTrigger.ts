import { DomainEvent } from '../../../Shared/Domain/DomainEvent';
import { Primitives } from '../../../Shared/Domain/Primitives';

type Attributes = Record<string, unknown>;

export class TaskEventToTrigger extends DomainEvent<Attributes> {
  constructor(props: Primitives<TaskEventToTrigger>) {
    const { type, aggregateId, id, occurredOn, attributes, meta } = props;
    super(type, aggregateId, attributes, meta, new Date(occurredOn), id);
  }

  static fromPrimitives(primitives: Primitives<TaskEventToTrigger>): TaskEventToTrigger {
    return new TaskEventToTrigger(primitives);
  }
}
