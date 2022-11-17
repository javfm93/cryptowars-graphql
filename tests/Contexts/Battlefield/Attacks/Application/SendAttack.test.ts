import { SendAttackCommandGenerator } from './SendAttackCommandGenerator';
import { AttackExposedEventsGenerator } from '../Domain/AttackExposedEventsGenerator';
import EventBusMock from '../../../Shared/Infrastructure/EventBusMock';
import { Forbidden } from '../../../../../src/Contexts/Shared/Domain/Errors/Forbidden';
import { ArmyGenerator } from '../../Armies/domain/ArmyGenerator';
import { ArmyNotFound } from '../../../../../src/Contexts/Battlefield/Armies/Application/Find/ArmyNotFound';
import { BattlefieldEventsRepositoryMock } from '../../Shared/__mocks__/BattlefieldEventsRepositoryMock';
import { SendAttack } from '../../../../../src/Contexts/Battlefield/Attacks/Application/Send/SendAttack';
import { SendAttackCommandHandler } from '../../../../../src/Contexts/Battlefield/Attacks/Application/Send/SendAttackCommandHandler';
import { mockTimeCleanUp, mockTimeSetup } from '../../../Shared/__mocks__/MockTime';
import { InvalidNumberOfSoldiers } from '../../../../../src/Contexts/CryptoWars/Towns/domain/InvalidNumberOfSoldiers';
import { AttackAlreadyExist } from '../../../../../src/Contexts/Battlefield/Attacks/Application/Send/AttackAlreadyExist';
import { QueryBusMock } from '../../../Shared/Infrastructure/QueryBusMock';
import { failure, successAndReturn } from '../../../../../src/Contexts/Shared/Aplication/Result';

const mockedNewUuid = '1f196f17-7437-47bd-9ac8-7ee33aa58987';

jest.mock('uuid', () => ({ v4: () => mockedNewUuid }));
jest.mock('uuid-validate', () => () => true);

describe('[Application] SendAttack', () => {
  const repository = new BattlefieldEventsRepositoryMock();
  const eventBus = new EventBusMock();
  const queryBus = new QueryBusMock();
  const creator = new SendAttack(repository, queryBus, eventBus);
  const handler = new SendAttackCommandHandler(creator);

  beforeEach(() => {
    eventBus.resetMock();
    repository.resetMocks();
    mockTimeSetup();
  });
  afterAll(mockTimeCleanUp);

  it('should send an attack', async () => {
    const attackerArmy = ArmyGenerator.random();
    const defenderArmy = ArmyGenerator.random();
    const command = SendAttackCommandGenerator.betweenArmies(attackerArmy, defenderArmy);
    queryBus.whenAskThenReturn(successAndReturn(attackerArmy));
    repository.whenMaterializeArmyByTownIdThenReturn(defenderArmy);

    const result = await handler.handle(command);

    if (result.isFailure()) fail(result.value);
    const attackSent = AttackExposedEventsGenerator.attackSentFrom(command, defenderArmy);
    const attackArrived = AttackExposedEventsGenerator.attackArrivedFor(attackSent.aggregateId);
    repository.expectLastSavedBattlefieldEventsToBe([attackSent.toBattlefieldInternalEvent()]);
    eventBus.expectPublishedEventsToBe([attackSent, attackArrived]);
  });

  describe('should not create an attack when: ', () => {
    // todo: validation with soldiers confusion with game context
    xit('the attacker number of soldiers is invalid', async () => {
      const command = SendAttackCommandGenerator.withInvalidNumberOfSoldiersFor();

      const result = await handler.handle(command);

      expect(result.value).toStrictEqual(new InvalidNumberOfSoldiers());
      repository.expectSavedNotToBeCalled();
      eventBus.expectEventsNotToBePublished();
    });

    it('the attacker does not own the town', async () => {
      const attackerArmy = ArmyGenerator.random();
      const command = SendAttackCommandGenerator.fromArmyWithDifferentPlayer(attackerArmy);
      queryBus.whenAskThenReturn(failure(new Forbidden()));

      const result = await handler.handle(command);

      expect(result.value).toStrictEqual(new Forbidden());
      repository.expectSavedNotToBeCalled();
      eventBus.expectEventsNotToBePublished();
    });

    it('the attacker Army does not exist', async () => {
      const attackerArmy = ArmyGenerator.random();
      const defenderArmy = ArmyGenerator.random();
      const command = SendAttackCommandGenerator.betweenArmies(attackerArmy, defenderArmy);
      queryBus.whenAskThenReturn(failure(new ArmyNotFound()));

      const result = await handler.handle(command);

      expect(result.value).toStrictEqual(new ArmyNotFound());
      repository.expectSavedNotToBeCalled();
      eventBus.expectEventsNotToBePublished();
    });

    it('the defender town does not exist', async () => {
      const attackerArmy = ArmyGenerator.random();
      const defenderArmy = ArmyGenerator.random();
      const command = SendAttackCommandGenerator.betweenArmies(attackerArmy, defenderArmy);
      queryBus.whenAskThenReturn(successAndReturn(attackerArmy));

      const result = await handler.handle(command);

      expect(result.value).toStrictEqual(new ArmyNotFound());
      repository.expectSavedNotToBeCalled();
      eventBus.expectEventsNotToBePublished();
    });

    it('the attack already exist', async () => {
      const attackerArmy = ArmyGenerator.random();
      const defenderArmy = ArmyGenerator.random();
      const command = SendAttackCommandGenerator.betweenArmies(attackerArmy, defenderArmy);
      queryBus.whenAskThenReturn(successAndReturn(attackerArmy));
      const attackSent = AttackExposedEventsGenerator.attackSentFrom(command, defenderArmy);
      repository.whenFindByAggregateIdThenReturn(attackSent.toBattlefieldInternalEvent());

      const result = await handler.handle(command);

      expect(result.value).toStrictEqual(new AttackAlreadyExist());
      repository.expectSavedNotToBeCalled();
      eventBus.expectEventsNotToBePublished();
    });

    it('the attacker does not have enough soldiers', async () => {
      const attackerArmy = ArmyGenerator.random();
      const command = SendAttackCommandGenerator.withMoreSoldiersThantTheArmy(attackerArmy);
      queryBus.whenAskThenReturn(successAndReturn(attackerArmy));

      const result = await handler.handle(command);

      expect(result.value).toStrictEqual(new InvalidNumberOfSoldiers());
      repository.expectSavedNotToBeCalled();
      eventBus.expectEventsNotToBePublished();
    });
  });
});
