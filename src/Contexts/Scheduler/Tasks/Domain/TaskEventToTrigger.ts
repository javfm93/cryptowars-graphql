import { DomainEvent } from '../../../Shared/Domain/DomainEvent';
import { Primitives } from '../../../Shared/Domain/Primitives';

export class TaskEventToTrigger extends DomainEvent {
  public data: unknown;

  constructor(props: Primitives<TaskEventToTrigger>) {
    super(props.eventName, props.aggregateId, props.eventId, new Date(props.occurredOn));
    this.data = props.data;
  }

  toPrimitive(): Primitives<TaskEventToTrigger> {
    return {
      eventName: this.eventName,
      aggregateId: this.aggregateId,
      eventId: this.eventId,
      occurredOn: this.occurredOn,
      data: this.data
    };
  }

  static fromPrimitives(primitives: Primitives<TaskEventToTrigger>): TaskEventToTrigger {
    return new TaskEventToTrigger(primitives);
  }
}
