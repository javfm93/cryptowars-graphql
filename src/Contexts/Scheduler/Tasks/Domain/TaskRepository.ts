import { Task } from './Task';
import { Tasks } from './Tasks';

export type QueryOptions = { retrieveRelations: boolean };

export abstract class TaskRepository {
  abstract save(task: Task): Promise<void>;

  abstract updateMultiple(tasks: Tasks): Promise<void>;

  abstract findTaskPreviousThan(timestamp: number): Promise<Tasks>;

  abstract clear(): Promise<void>;
}
