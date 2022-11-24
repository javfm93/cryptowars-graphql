import { DomainEventClass } from '../../../../Shared/Domain/DomainEvent';
import { DomainEventSubscriber } from '../../../../Shared/Domain/DomainEventSubscriber';
import { CreateTask } from './CreateTask';
import { TaskId } from '../../Domain/TaskId';
import { TaskRequestedDomainEvent } from '../../Domain/TaskRequestedDomainEvent';
import { FutureUnixTimestamp } from '../../Domain/FutureUnixTimestamp';
import { TaskEventToTrigger } from '../../Domain/TaskEventToTrigger';

export class CreateTaskOnTaskRequested implements DomainEventSubscriber<TaskRequestedDomainEvent> {
  constructor(private createTask: CreateTask) {}

  subscribedTo(): DomainEventClass[] {
    return [TaskRequestedDomainEvent];
  }

  async on(domainEvent: TaskRequestedDomainEvent) {
    const id = TaskId.create(domainEvent.aggregateId);
    const triggerAt = FutureUnixTimestamp.create(domainEvent.attributes.triggerAt);
    // todo: what happens with this throw? should I log it?
    if (triggerAt.isFailure()) throw triggerAt.value;
    const eventToTrigger = new TaskEventToTrigger(domainEvent.attributes.eventToTrigger);
    await this.createTask.execute({ id, triggerAt: triggerAt.value, eventToTrigger });
  }
}
