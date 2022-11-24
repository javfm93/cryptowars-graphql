import EventBusMock from '../../../Shared/Infrastructure/EventBusMock';
import { TaskRepositoryMock } from '../__mocks__/TaskRepositoryMock';
import { CreateTask } from '../../../../../src/Contexts/Scheduler/Tasks/Application/Create/CreateTask';
import { CreateTaskOnTaskRequested } from '../../../../../src/Contexts/Scheduler/Tasks/Application/Create/CreateTaskOnTaskRequested';
import { RequestTaskEventGenerator } from '../Domain/RequestTaskEventGenerator';
import { TaskId } from '../../../../../src/Contexts/Scheduler/Tasks/Domain/TaskId';
import { TaskGenerator } from '../Domain/TaskGenerator';
import { TaskEventsGenerator } from '../Domain/TaskEventsGenerator';
import { mockTimeCleanUp, mockTimeSetup } from '../../../Shared/__mocks__/MockTime';

const mockedNewUuid = '1f196f17-7437-47bd-9ac8-7ee33aa58987';

jest.mock('uuid', () => ({ v4: () => mockedNewUuid }));
jest.mock('uuid-validate', () => () => true);

describe('[Application] Create Task', () => {
  const repository = new TaskRepositoryMock();
  const eventBus = new EventBusMock();
  const creator = new CreateTask(repository, eventBus);
  const handler = new CreateTaskOnTaskRequested(creator);

  beforeAll(mockTimeSetup);
  afterAll(mockTimeCleanUp);

  beforeEach(() => {
    eventBus.resetMock();
  });

  it('should create a task when a task is requested', async () => {
    const event = RequestTaskEventGenerator.random();

    await handler.on(event);

    const taskId = TaskId.create(event.aggregateId);
    const expectedTask = TaskGenerator.fromEvent(event);
    const expectedEvent = TaskEventsGenerator.taskCreated(taskId);
    repository.expectLastSavedTaskToBe(expectedTask);
    eventBus.expectLastPublishedEventToBe(expectedEvent);
  });

  it('should throw when the event has an invalid date', async () => {
    // todo: inject the logger and check
    const event = RequestTaskEventGenerator.withPastTime();

    await handler.on(event);

    eventBus.expectEventsNotToBePublished();
  });
});
