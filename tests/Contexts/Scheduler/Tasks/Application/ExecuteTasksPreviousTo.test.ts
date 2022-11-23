import { ExecuteTasksPreviousToCommandGenerator } from './ExecuteTasksPreviousToCommandGenerator';
import EventBusMock from '../../../Shared/Infrastructure/EventBusMock';
import { mockTimeCleanUp, mockTimeSetup } from '../../../Shared/__mocks__/MockTime';
import { TaskRepositoryMock } from '../__mocks__/TaskRepositoryMock';
import { ExecuteTasksPreviousTo } from '../../../../../src/Contexts/Scheduler/Tasks/Application/Execute/ExecuteTasksPreviousTo';
import { ExecuteTasksPreviousToCommandHandler } from '../../../../../src/Contexts/Scheduler/Tasks/Application/Execute/ExecuteTasksPreviousToCommandHandler';
import { TaskGenerator } from '../Domain/TaskGenerator';

const mockedNewUuid = '1f196f17-7437-47bd-9ac8-7ee33aa58987';

jest.mock('uuid', () => ({ v4: () => mockedNewUuid }));
jest.mock('uuid-validate', () => () => true);

describe('[Application] Execute task previous to', () => {
  const repository = new TaskRepositoryMock();
  const eventBus = new EventBusMock();
  const creator = new ExecuteTasksPreviousTo(repository, eventBus);
  const handler = new ExecuteTasksPreviousToCommandHandler(creator);

  beforeEach(() => {
    eventBus.resetMock();
    mockTimeSetup();
  });

  afterAll(mockTimeCleanUp);

  it('should execute all the task that already expired', async () => {
    const expectedTasks = TaskGenerator.multipleRandom();
    const command = ExecuteTasksPreviousToCommandGenerator.now();
    repository.whenFindTaskPreviousThanThenReturn(command.timestamp, expectedTasks);

    const result = await handler.handle(command);

    expectedTasks.markAsFinished();
    if (result.isFailure()) fail(result.value);
    eventBus.expectPublishedEventsToBe(expectedTasks.getEventsToTrigger());
    repository.expectLastSavedTasksToBe(expectedTasks);
  });
});
