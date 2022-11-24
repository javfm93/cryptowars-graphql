import { TaskGenerator } from '../../Domain/TaskGenerator';
import container from '../../../../../../src/apps/CryptoWars/backend/dependency-injection';
import { Tasks } from '../../../../../../src/Contexts/Scheduler/Tasks/Domain/Tasks';
import { mockTimeCleanUp, mockTimeSetup } from '../../../../Shared/__mocks__/MockTime';
import * as faker from 'faker';
import { TaskRepository } from '../../../../../../src/Contexts/Scheduler/Tasks/Domain/TaskRepository';

const repository: TaskRepository = container.get('Scheduler.Tasks.TaskRepository');

describe('[infra] TaskRepository', () => {
  beforeAll(mockTimeSetup);
  afterAll(mockTimeCleanUp);

  describe('#save', () => {
    it('should save a task', async () => {
      const task = TaskGenerator.random();
      await repository.save(task);
    });
    it('should save multiple task', async () => {
      const tasks = TaskGenerator.multipleRandom();
      await repository.updateMultiple(tasks);
    });
  });

  describe('#search', () => {
    let expectedTasks: Tasks;

    beforeEach(async () => {
      await repository.clear();
      expectedTasks = TaskGenerator.multipleRandom();
      await repository.updateMultiple(expectedTasks);
    });

    it('should return the tasks to execute', async () => {
      const tasks = await repository.findTaskPreviousThan(faker.date.future().getTime());
      expect(tasks.getItems()).toStrictEqual(expectedTasks.getItems());
    });
  });
});
