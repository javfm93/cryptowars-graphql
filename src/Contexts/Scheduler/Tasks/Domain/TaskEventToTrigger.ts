import { DomainEvent } from '../../../Shared/Domain/DomainEvent';
import { Primitives } from '../../../Shared/Domain/Primitives';

export class TaskEventToTrigger extends DomainEvent {
  constructor(props: Primitives<TaskEventToTrigger>) {
    super(props.eventName, props.aggregateId, props.eventId, new Date(props.occurredOn));
  }

  toPrimitive(): Primitives<TaskEventToTrigger> {
    return {
      eventName: this.eventName,
      aggregateId: this.aggregateId,
      eventId: this.eventId,
      occurredOn: this.occurredOn
    };
  }

  static fromPrimitives(primitives: Primitives<TaskEventToTrigger>): DomainEvent {
    return new TaskEventToTrigger(primitives);
  }
}
