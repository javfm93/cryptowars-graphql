import { Task } from './Task';
import { Tasks } from './Tasks';

export type QueryOptions = { retrieveRelations: boolean };

export interface TaskRepository {
  save(task: Task): Promise<void>;

  saveMultiple(tasks: Tasks): Promise<void>;

  findTaskPreviousThan(timestamp: number): Promise<Tasks>;

  clear(): Promise<void>
}
