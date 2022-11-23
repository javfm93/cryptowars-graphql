import { TaskId } from '../../../../../src/Contexts/Scheduler/Tasks/Domain/TaskId';
import { TaskCreatedDomainEvent } from '../../../../../src/Contexts/Scheduler/Tasks/Domain/TaskCreatedDomainEvent';

export class TaskEventsGenerator {
  static taskCreated(taskId: TaskId): TaskCreatedDomainEvent {
    return new TaskCreatedDomainEvent({ aggregateId: taskId.toString() });
  }
}
