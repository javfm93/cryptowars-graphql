import { TaskRepository } from '../../../../../src/Contexts/Scheduler/Tasks/Domain/TaskRepository';
import { Task } from '../../../../../src/Contexts/Scheduler/Tasks/Domain/Task';
import { Tasks } from '../../../../../src/Contexts/Scheduler/Tasks/Domain/Tasks';

export class TaskRepositoryMock implements TaskRepository {
  private mockSave = jest.fn();
  private mockSaveMultiple = jest.fn();
  private mockFindTaskPreviousThan = jest.fn();

  async save(task: Task): Promise<void> {
    this.mockSave(task);
  }

  expectLastSavedTaskToBe(expectedTask: Task): void {
    expect(this.mockSave).toBeCalledWith(expectedTask);
  }

  async updateMultiple(task: Tasks): Promise<void> {
    this.mockSaveMultiple(task);
  }

  expectLastSavedTasksToBe(expectedTasks: Tasks): void {
    expect(this.mockSaveMultiple).toBeCalledWith(expectedTasks);
  }

  async findTaskPreviousThan(timestamp: number): Promise<Tasks> {
    return this.mockFindTaskPreviousThan(timestamp);
  }

  whenFindTaskPreviousThanThenReturn(expectedTimestamp: number, tasks: Tasks): void {
    this.mockFindTaskPreviousThan.mockImplementationOnce(
      (timestamp: number): Tasks =>
        expectedTimestamp === timestamp
          ? Tasks.fromPrimitives(tasks.toPrimitives())
          : Tasks.create()
    );
  }

  async clear(): Promise<void> {}
}
