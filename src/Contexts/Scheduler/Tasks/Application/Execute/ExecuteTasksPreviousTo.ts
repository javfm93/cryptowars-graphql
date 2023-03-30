import { UseCase, BaseUseCase } from '../../../../Shared/Domain/BaseUseCase';
import { EventBus } from '../../../../Shared/Domain/EventBus';
import { Result, Nothing, success } from '../../../../Shared/Aplication/Result';
import { TaskRepository } from '../../Domain/TaskRepository';
import { DomainError } from '../../../../Shared/Domain/Errors/DomainError';
import { logger } from '../../../../Shared/Infrastructure/WinstonLogger';

type SendAttackResult = Result<Nothing, DomainError>;

@UseCase()
export class ExecuteTasksPreviousTo implements BaseUseCase<number, Nothing> {
  constructor(private taskRepository: TaskRepository, private eventBus: EventBus) {}

  async execute(timestamp: number): Promise<SendAttackResult> {
    const tasks = await this.taskRepository.findTaskPreviousThan(timestamp);

    if (tasks.getItems().length) {
      await this.eventBus.publish(tasks.getEventsToTrigger());
      tasks.markAsFinished();
      await this.taskRepository.updateMultiple(tasks);
      logger.debug(`${tasks.getItems().length} tasks dispatched`);
    }
    logger.sampledOneSixtyInfo(`${tasks.getItems().length} tasks dispatched`);
    return success();
  }
}
