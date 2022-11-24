import { UuidGenerator } from '../../../Shared/Domain/UuidGenerator';
import { TaskRequestedDomainEvent } from '../../../../../src/Contexts/Scheduler/Tasks/Domain/TaskRequestedDomainEvent';
import { AttackExposedEventsGenerator } from '../../../Battlefield/Attacks/Domain/AttackExposedEventsGenerator';
import * as faker from 'faker';
import { TaskIdGenerator } from './TaskIdGenerator';
import { TaskEventToTrigger } from '../../../../../src/Contexts/Scheduler/Tasks/Domain/TaskEventToTrigger';
import { Primitives } from '../../../../../src/Contexts/Shared/Domain/Primitives';

export class RequestTaskEventGenerator {
  static create(
    aggregateId: string,
    triggerAt: number,
    eventToTrigger: Primitives<TaskEventToTrigger>
  ): TaskRequestedDomainEvent {
    return new TaskRequestedDomainEvent({ aggregateId, attributes: { triggerAt, eventToTrigger } });
  }

  static random(): TaskRequestedDomainEvent {
    return this.create(
      TaskIdGenerator.random().toString(),
      faker.date.soon().getTime(),
      AttackExposedEventsGenerator.attackArrivedFor(UuidGenerator.random().toString())
    );
  }

  static withPastTime(): TaskRequestedDomainEvent {
    return this.create(
      TaskIdGenerator.random().toString(),
      faker.date.recent().getTime(),
      AttackExposedEventsGenerator.attackArrivedFor(UuidGenerator.random().toString())
    );
  }
}
