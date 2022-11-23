import { TaskRepository } from '../../Domain/TaskRepository';
import { UseCase } from '../../../../Shared/Domain/UseCase';
import { Task } from '../../Domain/Task';
import { EventBus } from '../../../../Shared/Domain/EventBus';
import { Either, EmptyResult, success } from '../../../../Shared/Aplication/Result';
import { DomainError } from '../../../../Shared/Domain/Errors/DomainError';
import { TaskId } from '../../Domain/TaskId';
import { FutureUnixTimestamp } from '../../Domain/FutureUnixTimestamp';
import { logger } from '../../../../Shared/Infrastructure/WinstonLogger';
import { TaskEventToTrigger } from '../../Domain/TaskEventToTrigger';

type Args = {
  id: TaskId;
  triggerAt: FutureUnixTimestamp;
  eventToTrigger: TaskEventToTrigger;
};

type CreatePlayerResult = Either<EmptyResult, DomainError>;

export class CreateTask implements UseCase<Args, EmptyResult> {
  constructor(private taskRepository: TaskRepository, private eventBus: EventBus) {}

  async execute({ id, triggerAt, eventToTrigger }: Args): Promise<CreatePlayerResult> {
    const task = Task.create(id, triggerAt, eventToTrigger);
    await this.taskRepository.save(task);
    await this.eventBus.publish(task.pullDomainEvents());
    logger.debug(
      `Task created, ${task.eventToTrigger.eventName} will trigger at ${task.triggerAt.toIso()}`
    );
    return success();
  }
}
