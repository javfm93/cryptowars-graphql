import { UuidGenerator } from '../../../Shared/Domain/UuidGenerator';
import { TaskId } from '../../../../../src/Contexts/Scheduler/Tasks/Domain/TaskId';

export class TaskIdGenerator {
  static create(value: string): TaskId {
    return TaskId.create(value);
  }

  static random(): TaskId {
    return this.create(UuidGenerator.random().toString());
  }
}
