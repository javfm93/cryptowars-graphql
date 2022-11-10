import EventBusMock from '../../../Shared/Infrastructure/EventBusMock';
import { TownRepositoryMock } from '../__mocks__/TownRepositoryMock';
import { TrainSoldiersCommandGenerator } from './TrainSoldiersCommandGenerator';
import { TrainSoldiers } from '../../../../../src/Contexts/CryptoWars/Towns/application/TrainSoldiers/TrainSoldiers';
import { TrainSoldiersCommandHandler } from '../../../../../src/Contexts/CryptoWars/Towns/application/TrainSoldiers/TrainSoldiersCommandHandler';
import { TownEventsGenerator } from '../domain/TownEventsGenerator';
import { TownNotFound } from '../../../../../src/Contexts/CryptoWars/Towns/application/TrainSoldiers/TownNotFound';
import { TownGenerator } from '../domain/TownGenerator';
import { InvalidNumberOfSoldiers } from '../../../../../src/Contexts/CryptoWars/Towns/domain/InvalidNumberOfSoldiers';
import { InvalidSoldier } from '../../../../../src/Contexts/CryptoWars/Towns/domain/InvalidSoldier';

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
    eventBus.expectLastPublishedEventToBe(expectedEvent);
  });

  it('should throw when the town does not exist', async () => {
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

  xit('should not train a soldier when the town doesnt have enough essence', async () => {
    const command = TrainSoldiersCommandGenerator.random();

    await handler.handle(command);

    eventBus.expectEventsNotToBePublished();
  });
});
