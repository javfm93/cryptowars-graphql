import { UseCase } from '../../../../Shared/Domain/UseCase';
import { EventBus } from '../../../../Shared/Domain/EventBus';
import { Either, EmptyResult, success } from '../../../../Shared/Aplication/Result';
import { TaskRepository } from '../../Domain/TaskRepository';
import { DomainError } from '../../../../Shared/Domain/Errors/DomainError';
import { logger } from '../../../../Shared/Infrastructure/WinstonLogger';

type SendAttackResult = Either<EmptyResult, DomainError>;

export class ExecuteTasksPreviousTo implements UseCase<number, EmptyResult> {
  constructor(private taskRepository: TaskRepository, private eventBus: EventBus) {}

  async execute(timestamp: number): Promise<SendAttackResult> {
    const tasks = await this.taskRepository.findTaskPreviousThan(timestamp);

    if (tasks.getItems().length) {
      await this.eventBus.publish(tasks.getEventsToTrigger());
      tasks.markAsFinished();
      await this.taskRepository.updateMultiple(tasks);
      if (tasks.getItems().length) logger.debug(`${tasks.getItems().length} tasks dispatched`);
    }
    logger.sampledOneTenthInfo(`${tasks.getItems().length} tasks dispatched`);
    return success();
  }
}
