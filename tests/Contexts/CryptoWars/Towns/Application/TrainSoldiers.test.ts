import EventBusMock from '../../../Shared/Infrastructure/EventBusMock';
import { TownRepositoryMock } from '../__mocks__/TownRepositoryMock';
import { TrainSoldiersCommandGenerator } from './TrainSoldiersCommandGenerator';
import { TownGenerator } from '../domain/TownGenerator';

describe('[Application] Train soldier', () => {
  const repository = new TownRepositoryMock();
  const eventBus = new EventBusMock();
  const creator = new TrainSoldier(repository, eventBus);
  const handler = new TrainSoldierCommandHandler(creator);

  // emit train finished from cryptowars bounded context
  // todo: create battlefield bounded context
  // received soldier train finished event
  // add the soldier to the town
  it('should train a soldier', async () => {
    const command = TrainSoldiersCommandGenerator.random();

    await handler.handle(command);

    const expectedEvent = TownEventsGenerator.soldierTrainFinished(
      town.id,
      command.numberOfSoldiers
    );
    eventBus.expectLastPublishedEventToBe(expectedEvent);
  });

  it('should throw when the soldiers to train are negative', async () => {
    const command = TrainSoldiersCommandGenerator.random();

    await handler.handle(command);

    const expectedEvent = TownEventsGenerator.soldierTrainFinished(
      town.id,
      command.numberOfSoldiers
    );
    eventBus.expectLastPublishedEventToBe(expectedEvent);
  });

  it('should throw when trying to to train a not supported soldier', async () => {
    const command = TrainSoldiersCommandGenerator.random();

    await handler.handle(command);

    const expectedEvent = TownEventsGenerator.soldierTrainFinished(
      town.id,
      command.numberOfSoldiers
    );
    eventBus.expectLastPublishedEventToBe(expectedEvent);
  });

  xit('should not train a soldier that is not available for the town', async () => {
    const command = TrainSoldiersCommandGenerator.random();

    await handler.handle(command);

    const expectedEvent = TownEventsGenerator.soldierTrainFinished(player.id, world.id);
    const town = TownGenerator.fromCommand(command);
    repository.expectLastSavedTownToBe(town);
    eventBus.expectLastPublishedEventToBe(expectedEvent);
  });

  xit('should not train a soldier when the town doesnt have enough essence', async () => {
    const command = TrainSoldiersCommandGenerator.random();

    await handler.handle(command);

    const expectedEvent = TownEventsGenerator.soldierTrainFinished(player.id, world.id);
    const town = TownGenerator.fromCommand(command);
    repository.expectLastSavedTownToBe(town);
    eventBus.expectLastPublishedEventToBe(expectedEvent);
  });
});
