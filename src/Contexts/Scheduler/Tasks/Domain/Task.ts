import { TaskCreatedDomainEvent } from './TaskCreatedDomainEvent';
import { TaskId } from './TaskId';
import { AggregateRoot } from '../../../Shared/Domain/FlatAggregateRoot';
import { FutureUnixTimestamp } from './FutureUnixTimestamp';
import { Primitives } from '../../../Shared/Domain/Primitives';
import { TaskEventToTrigger } from './TaskEventToTrigger';

export class Task extends AggregateRoot {
  private constructor(
    id: TaskId,
    readonly triggerAt: FutureUnixTimestamp,
    readonly eventToTrigger: TaskEventToTrigger,
    readonly createdAt: Date = new Date(),
    public status: 'waiting' | 'finished' = 'waiting'
  ) {
    super(id);
  }

  public static create(
    id: TaskId,
    triggerAt: FutureUnixTimestamp,
    eventToTrigger: TaskEventToTrigger
  ): Task {
    const task = new Task(id, triggerAt, eventToTrigger);
    task.record(
      new TaskCreatedDomainEvent({
        aggregateId: task.id.toString()
      })
    );
    return task;
  }

  markAsFinished(): void {
    this.status = 'finished';
  }

  toPrimitives(): Primitives<Task> {
    return {
      id: this.id.toString(),
      triggerAt: this.triggerAt.value,
      eventToTrigger: this.eventToTrigger.toPrimitive(),
      createdAt: this.createdAt,
      status: this.status
    };
  }

  static fromPrimitives(plainData: Primitives<Task>): Task {
    const id = TaskId.create(plainData.id);
    const triggerAt = FutureUnixTimestamp.fromPrimitives(plainData.triggerAt);
    const eventToTrigger = TaskEventToTrigger.fromPrimitives(plainData.eventToTrigger);
    return new Task(id, triggerAt, eventToTrigger, plainData.createdAt, plainData.status);
  }
}
