import { Primitives } from '../../../Shared/Domain/Primitives';
import { WatchedList } from '../../../Shared/Domain/WatchedList';
import { Task } from './Task';
import { TaskEventToTrigger } from './TaskEventToTrigger';

export class Tasks extends WatchedList<Task> {
  private constructor(initial: Array<Task>) {
    super(initial);
  }

  public compareItems(a: Task, b: Task): boolean {
    return a.isEqualTo(b);
  }

  public toPrimitives(): Array<Primitives<Task>> {
    return this.currentItems.map(task => task.toPrimitives());
  }

  public getEventsToTrigger(): Array<TaskEventToTrigger> {
    return this.getItems().map(task => task.eventToTrigger);
  }

  public markAsFinished(): void {
    this.getItems().map(task => task.markAsFinished());
  }

  public static create(initialTasks?: Array<Task>): Tasks {
    return new Tasks(initialTasks ?? []);
  }

  public static fromPrimitives(tasksPrimitive: Array<Primitives<Task>>): Tasks {
    const tasks = tasksPrimitive.map(Task.fromPrimitives);
    return this.create(tasks);
  }
}
