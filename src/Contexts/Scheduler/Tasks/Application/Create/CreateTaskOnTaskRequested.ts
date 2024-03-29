import { DomainEventClass } from '../../../../Shared/Domain/DomainEvent';
import {
  DomainEventHandler,
  RegisterDomainEventHandler
} from '../../../../Shared/Domain/DomainEventHandler';
import { CreateTask } from './CreateTask';
import { TaskId } from '../../Domain/TaskId';
import { TaskRequestedDomainEvent } from '../../Domain/TaskRequestedDomainEvent';
import { FutureUnixTimestamp } from '../../Domain/FutureUnixTimestamp';
import { TaskEventToTrigger } from '../../Domain/TaskEventToTrigger';
import { logger } from '../../../../Shared/Infrastructure/WinstonLogger';

@RegisterDomainEventHandler()
export class CreateTaskOnTaskRequested implements DomainEventHandler<TaskRequestedDomainEvent> {
  constructor(private createTask: CreateTask) {}

  subscribedTo(): DomainEventClass[] {
    return [TaskRequestedDomainEvent];
  }

  async on(domainEvent: TaskRequestedDomainEvent) {
    const id = TaskId.create(domainEvent.aggregateId);
    const triggerAt = FutureUnixTimestamp.create(domainEvent.attributes.triggerAt);
    if (triggerAt.isFailure()) return logger.error(triggerAt.value.stack);
    const eventToTrigger = new TaskEventToTrigger(domainEvent.attributes.eventToTrigger);
    await this.createTask.execute({ id, triggerAt: triggerAt.value, eventToTrigger });
  }
}
