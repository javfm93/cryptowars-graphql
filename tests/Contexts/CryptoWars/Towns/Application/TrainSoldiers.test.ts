import EventBusMock from '../../../Shared/Infrastructure/EventBusMock';
import { TownRepositoryMock } from '../__mocks__/TownRepositoryMock';
import { TrainSoldiersCommandGenerator } from './TrainSoldiersCommandGenerator';
import { TrainSoldiers } from '../../../../../src/Contexts/CryptoWars/Towns/Application/TrainSoldiers/TrainSoldiers';
import { TrainSoldiersCommandHandler } from '../../../../../src/Contexts/CryptoWars/Towns/Application/TrainSoldiers/TrainSoldiersCommandHandler';
import { TownEventsGenerator } from '../Domain/TownEventsGenerator';
import { TownNotFound } from '../../../../../src/Contexts/CryptoWars/Towns/Application/TrainSoldiers/TownNotFound';
import { TownGenerator } from '../Domain/TownGenerator';
import { InvalidNumberOfSoldiers } from '../../../../../src/Contexts/CryptoWars/Towns/Domain/InvalidNumberOfSoldiers';
import { InvalidSoldier } from '../../../../../src/Contexts/CryptoWars/Towns/Domain/InvalidSoldier';
import { Forbidden } from '../../../../../src/Contexts/Shared/Domain/Errors/Forbidden';

describe('[Application] Train soldier', () => {
  const repository = new TownRepositoryMock();
  const eventBus = new EventBusMock();
  const creator = new TrainSoldiers(repository, eventBus);
  const handler = new TrainSoldiersCommandHandler(creator);

  beforeEach(() => {
    eventBus.resetMock();
  });

  it('should train a soldier', async () => {
    const expectedTown = TownGenerator.random();
    const command = TrainSoldiersCommandGenerator.randomFor(expectedTown);
    repository.whenFindByIdThenReturn(expectedTown);

    await handler.handle(command);

    const expectedEvent = TownEventsGenerator.soldierTrainFinished(
      command.townId,
      command.soldiers
    );
    // todo: is not testing the change in the timestamp of last update
    repository.expectLastSavedTownToBe(expectedTown);
    eventBus.expectLastPublishedEventToBe(expectedEvent);
  });

  it('should return an error when the town doesnt have enough to pay', async () => {
    const expectedTown = TownGenerator.random();
    const command = TrainSoldiersCommandGenerator.invalidDueToSoldiersOverCost(expectedTown);
    repository.whenFindByIdThenReturn(expectedTown);

    const result = await handler.handle(command);

    expect(result.value).toStrictEqual(new Forbidden());
    eventBus.expectEventsNotToBePublished();
  });

  it('should return an error when the town you dont own the town', async () => {
    const expectedTown = TownGenerator.random();
    const command = TrainSoldiersCommandGenerator.invalidDueToPlayerNotOwningTheTown(expectedTown);
    repository.whenFindByIdThenReturn(expectedTown);

    const result = await handler.handle(command);

    expect(result.value).toStrictEqual(new Forbidden());
    eventBus.expectEventsNotToBePublished();
  });

  it('should return an error when the town does not exist', async () => {
    const command = TrainSoldiersCommandGenerator.random();

    const result = await handler.handle(command);

    if (result.isSuccess()) fail();
    expect(result.value).toStrictEqual(new TownNotFound());
    eventBus.expectEventsNotToBePublished();
  });

  it('should throw when the soldiers to train are negative', async () => {
    const command = TrainSoldiersCommandGenerator.invalidDueToNegativeSoldiers();

    const result = await handler.handle(command);

    if (result.isSuccess()) fail();
    expect(result.value).toStrictEqual(new InvalidNumberOfSoldiers());
    eventBus.expectEventsNotToBePublished();
  });

  it('should throw when trying to to train a not supported soldier', async () => {
    const command = TrainSoldiersCommandGenerator.invalidDueToNotSupportedSoldiers();

    const result = await handler.handle(command);

    if (result.isSuccess()) fail();
    expect(result.value).toStrictEqual(new InvalidSoldier('illegal'));
    eventBus.expectEventsNotToBePublished();
  });

  xit('should not train a soldier that is not available for the town', async () => {
    const command = TrainSoldiersCommandGenerator.random();

    await handler.handle(command);

    eventBus.expectEventsNotToBePublished();
  });
});
