import { VillageRepositoryMock } from '../__mocks__/VillageRepositoryMock';
import { CreateVillageCommandGenerator } from './CreateVillageCommandGenerator';
import { VillageGenerator } from '../Domain/VillageGenerator';
import { CreateVillage } from '../../../../../src/Contexts/CryptoWars/Villages/Application/Create/CreateVillage';
import { CreateVillageCommandHandler } from '../../../../../src/Contexts/CryptoWars/Villages/Application/Create/CreateVillageCommandHandler';
import EventBusMock from '../../../Shared/Infrastructure/EventBusMock';

describe('Application/Handler/CreateVillage', () => {
  const repository = new VillageRepositoryMock();
  const eventBus = new EventBusMock();
  const creator = new CreateVillage(repository, eventBus);
  const handler = new CreateVillageCommandHandler(creator);

  it('should create a valid village', async () => {
    const command = CreateVillageCommandGenerator.random();

    await handler.handle(command);

    const village = VillageGenerator.fromCommand(command);
    const events = village.pullDomainEvents();
    repository.expectLastSavedUserToBe(village);
    expect(events).toHaveLength(1);
    eventBus.expectLastPublishedEventToBe(events[0]);
  });
});
