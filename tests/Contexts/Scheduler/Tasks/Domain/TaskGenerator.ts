import { TaskIdGenerator } from './TaskIdGenerator';
import { AttackId } from '../../../../../src/Contexts/Battlefield/Attacks/Domain/AttackId';
import { Task } from '../../../../../src/Contexts/Scheduler/Tasks/Domain/Task';
import * as faker from 'faker';
import { AttackExposedEventsGenerator } from '../../../Battlefield/Attacks/Domain/AttackExposedEventsGenerator';
import { UuidGenerator } from '../../../Shared/Domain/UuidGenerator';
import { TaskRequestedDomainEvent } from '../../../../../src/Contexts/Scheduler/Tasks/Domain/TaskRequestedDomainEvent';
import { TaskId } from '../../../../../src/Contexts/Scheduler/Tasks/Domain/TaskId';
import { TaskEventToTrigger } from '../../../../../src/Contexts/Scheduler/Tasks/Domain/TaskEventToTrigger';
import { Tasks } from '../../../../../src/Contexts/Scheduler/Tasks/Domain/Tasks';

export class TaskGenerator {
  static create(
    id: AttackId,
    triggerAt: number,
    eventToTrigger: TaskEventToTrigger,
    createdAt = new Date(),
    status: 'waiting' | 'finished' = 'waiting'
  ): Task {
    return Task.fromPrimitives({
      id: id.toString(),
      triggerAt,
      eventToTrigger,
      createdAt,
      status
    });
  }

  static random(): Task {
    return this.create(
      TaskIdGenerator.random(),
      faker.date.soon().getTime(),
      AttackExposedEventsGenerator.attackArrivedFor(UuidGenerator.random().toString())
    );
  }

  static multipleRandom(): Tasks {
    const tasks = Array.from({ length: 1 }, () => this.random());
    return Tasks.create(tasks);
  }

  static fromEvent(event: TaskRequestedDomainEvent): Task {
    return this.create(
      TaskId.create(event.aggregateId),
      event.attributes.triggerAt,
      TaskEventToTrigger.fromPrimitives(event.attributes.eventToTrigger)
    );
  }
}
