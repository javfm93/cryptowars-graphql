import { FindArmyByTownQueryGenerator } from './FindArmyByTownQueryGenerator';
import { ArmyGenerator } from '../domain/ArmyGenerator';
import { FindArmyByTown } from '../../../../../src/Contexts/Battlefield/Armies/Application/Find/FindArmyByTown';
import { FindArmyByTownQueryHandler } from '../../../../../src/Contexts/Battlefield/Armies/Application/Find/FindArmyByTownQueryHandler';
import { TownIdGenerator } from '../../../CryptoWars/Towns/domain/TownIdGenerator';
import { ArmyNotFound } from '../../../../../src/Contexts/Battlefield/Armies/Application/Find/ArmyNotFound';
import { PlayerIdGenerator } from '../../../CryptoWars/Players/domain/PlayerIdGenerator';
import { Forbidden } from '../../../../../src/Contexts/Shared/Domain/Errors/Forbidden';
import { BattlefieldEventsRepositoryMock } from '../../Shared/__mocks__/BattlefieldEventsRepositoryMock';

describe('[Application] Find Army', () => {
  const repository = new BattlefieldEventsRepositoryMock();
  const creator = new FindArmyByTown(repository);
  const handler = new FindArmyByTownQueryHandler(creator);

  it('should return the army', async () => {
    const expectedArmy = ArmyGenerator.random();
    const query = FindArmyByTownQueryGenerator.create(expectedArmy.PlayerId, expectedArmy.townId);
    repository.whenMaterializeArmyByTownIdThenReturn(expectedArmy);

    const army = await handler.handle(query);

    expect(army.value).toStrictEqual(expectedArmy);
  });

  it('should return an error when the army does not exist', async () => {
    const expectedArmy = ArmyGenerator.random();
    const query = FindArmyByTownQueryGenerator.create(
      expectedArmy.PlayerId,
      TownIdGenerator.random()
    );
    repository.whenMaterializeArmyByTownIdThenReturn(expectedArmy);

    const result = await handler.handle(query);

    expect(result.value).toStrictEqual(new ArmyNotFound());
  });

  it('should return an error when the player is not owner of the army', async () => {
    const expectedArmy = ArmyGenerator.random();
    const query = FindArmyByTownQueryGenerator.create(
      PlayerIdGenerator.random(),
      expectedArmy.townId
    );
    repository.whenMaterializeArmyByTownIdThenReturn(expectedArmy);

    const result = await handler.handle(query);

    expect(result.value).toStrictEqual(new Forbidden());
  });
});
