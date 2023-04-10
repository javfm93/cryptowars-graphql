import { EntitySchema, LessThanOrEqual } from 'typeorm';
import { Primitives } from '../../../../Shared/Domain/Primitives';
import {
  RegisterRepository,
  TypeOrmRepository
} from '../../../../Shared/Infrastructure/Persistence/Sqlite/TypeOrmRepository';
import { Task } from '../../Domain/Task';
import { TaskRepository } from '../../Domain/TaskRepository';
import { Tasks } from '../../Domain/Tasks';
import { TaskSchema } from '../TaskSchema';

@RegisterRepository(TaskRepository)
export class SqliteTaskRepository
  extends TypeOrmRepository<Primitives<Task>>
  implements TaskRepository
{
  public async save(task: Task): Promise<void> {
    const repository = await this.repository();
    await repository.createQueryBuilder().insert().values(this.fromTaskToDb(task)).execute();
  }

  public async updateMultiple(tasks: Tasks): Promise<void> {
    const repository = await this.repository();
    for (const t of tasks.getItems()) {
      await repository
        .createQueryBuilder()
        .update()
        .set(this.fromTaskToDb(t))
        .where('id = :id', { id: t.id })
        .execute();
    }
  }

  private fromTaskToDb(task: Task) {
    const t = task.toPrimitives();
    return {
      id: t.id,
      triggerAt: t.triggerAt,
      eventToTrigger: () => `'${JSON.stringify(t.eventToTrigger)}'`,
      createdAt: t.createdAt,
      status: t.status
    };
  }

  public async findTaskPreviousThan(timestamp: number): Promise<Tasks> {
    // todo: test that we dont return in invalid status
    const repository = await this.repository();
    const tasks = await repository.find({
      where: { triggerAt: LessThanOrEqual(timestamp), status: 'waiting' }
    });
    return Tasks.fromPrimitives(tasks);
  }

  public async clear(): Promise<void> {
    const repository = await this.repository();
    await repository.clear();
  }

  protected entitySchema(): EntitySchema<Primitives<Task>> {
    return TaskSchema;
  }
}
