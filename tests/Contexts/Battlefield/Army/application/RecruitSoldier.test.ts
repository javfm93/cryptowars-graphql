import { ArmyGenerator } from '../domain/ArmyGenerator';
import EventBusMock from '../../../Shared/Infrastructure/EventBusMock';
import { RecruitSquad } from '../../../../../src/Contexts/Battlefield/Armies/Application/Recruit/RecruitSquad';
import { RecruitSquadOnTownSoldiersTrainFinished } from '../../../../../src/Contexts/Battlefield/Armies/Application/Recruit/RecruitSquadOnTownSoldiersTrainFinished';
import { TownEventsGenerator } from '../domain/TownEventsGenerator';
import { BattlefieldEventsRepositoryMock } from '../../Shared/__mocks__/BattlefieldEventsRepositoryMock';
import { ArmyExposedEventsGenerator } from '../domain/ArmyExposedEventsGenerator';
import { SquadTypes } from '../../../../../src/Contexts/Battlefield/Armies/Domain/Squads';

const mockedNewUuid = '1f196f17-7437-47bd-9ac8-7ee33aa58987';

jest.mock('uuid', () => ({ v4: () => mockedNewUuid }));
jest.mock('uuid-validate', () => () => true);

describe('[Application] Recruit Soldiers', () => {
  const repository = new BattlefieldEventsRepositoryMock();
  const eventBus = new EventBusMock();
  const creator = new RecruitSquad(repository, eventBus);
  const handler = new RecruitSquadOnTownSoldiersTrainFinished(creator);

  it('should recruit soldiers when town soldiers train finish', async () => {
    const army = ArmyGenerator.random();
    const event = TownEventsGenerator.randomSoldiersTrainFinishedFor(army);
    const armyCreated = ArmyExposedEventsGenerator.ArmyCreated(army);
    repository.whenFindByAggregateIdThenReturn(armyCreated.toBattlefieldInternalEvent());

    await handler.on(event);

    const expectedEvent = ArmyExposedEventsGenerator.SoldiersRecruited(army.id, army.townId, {
      type: SquadTypes.basic,
      soldiers: event.soldiers.basic
    });

    repository.expectLastSavedBattlefieldEventToBe([expectedEvent]);
    eventBus.expectLastPublishedEventToBe(expectedEvent);
  });
  it('should fail when the town doesnt exist', async () => {
    const army = ArmyGenerator.random();
    // const initialSoldiers = army.toPrimitives().squads;
    const event = TownEventsGenerator.randomSoldiersTrainFinishedFor(army);
    // const trainedSolders = event.soldiers;

    await handler.on(event);

    // const expectedEvent = ArmyEventsGenerator.SoldiersRecruited(
    //   army.id,
    //   army.townId,
    //   army.basicSquad
    // );

    // repository.expectLastSavedArmyToHaveADifferenceOf(initialSoldiers, trainedSolders);
    // eventBus.expectLastPublishedEventToBe(expectedEvent);
  });
});
