import { TaskRepository } from '../../Domain/TaskRepository';
import { Task } from '../../Domain/Task';
import { TypeOrmRepository } from '../../../../Shared/Infrastructure/Persistence/Sqlite/TypeOrmRepository';
import { EntitySchema, LessThanOrEqual } from 'typeorm';
import { TaskSchema } from './typeorm/TaskSchema';
import { Primitives } from '../../../../Shared/Domain/Primitives';
import { Tasks } from '../../Domain/Tasks';

export class SqliteTaskRepository
  extends TypeOrmRepository<Primitives<Task>>
  implements TaskRepository
{
  public async save(task: Task): Promise<void> {
    const repository = await this.repository();
    const t = task.toPrimitives();
    await repository
      .createQueryBuilder()
      .insert()
      .values({
        id: t.id,
        triggerAt: t.triggerAt,
        eventToTrigger: () => `'${JSON.stringify(t.eventToTrigger)}'`,
        createdAt: t.createdAt,
        status: t.status
      })
      .execute();
  }

  public async saveMultiple(tasks: Tasks): Promise<void> {
    const repository = await this.repository();
    await repository.save(tasks.toPrimitives());
  }

  public async findTaskPreviousThan(timestamp: number): Promise<Tasks> {
    const repository = await this.repository();
    const tasks = await repository.find({
      where: { triggerAt: LessThanOrEqual(timestamp) }
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
