import { ListBattlesByArmyIdQueryGenerator } from './ListBattlesByArmyIdQueryGenerator';
import { ListBattlesByArmyId } from '../../../../../src/Contexts/Battlefield/Battles/Application/List/ListBattlesByArmyId';
import { ListBattlesByArmyIdQueryHandler } from '../../../../../src/Contexts/Battlefield/Battles/Application/List/ListBattlesByArmyIdQueryHandler';
import { BattleGenerator } from '../Domain/BattleGenerator';
import { BattlefieldEventsRepositoryMock } from '../../Shared/__mocks__/BattlefieldEventsRepositoryMock';
import { Forbidden } from '../../../../../src/Contexts/Shared/Domain/Errors/Forbidden';
import { ArmyGenerator } from '../../Armies/Domain/ArmyGenerator';
import { ArmyNotFound } from '../../../../../src/Contexts/Battlefield/Armies/Application/Find/ArmyNotFound';

describe('[Application] List Battles', () => {
  const repository = new BattlefieldEventsRepositoryMock();
  const creator = new ListBattlesByArmyId(repository);
  const handler = new ListBattlesByArmyIdQueryHandler(creator);

  it('should return the list of battles by armyId', async () => {
    const army = ArmyGenerator.random();
    const query = ListBattlesByArmyIdQueryGenerator.from(army);
    const expectedBattles = BattleGenerator.multipleRandomFor(army.id);
    repository.whenMaterializeArmyByArmyIdThenReturn(army);
    repository.whenMaterializeBattlesByArmyIdThenReturn(army.id, expectedBattles);

    const battles = await handler.handle(query);

    expect(battles.value).toStrictEqual(expectedBattles);
  });

  it('should return forbidden when you dont own the army', async () => {
    const army = ArmyGenerator.random();
    const query = ListBattlesByArmyIdQueryGenerator.withDifferentPlayer(army.id);
    repository.whenMaterializeArmyByArmyIdThenReturn(army);

    const battles = await handler.handle(query);

    expect(battles.value).toStrictEqual(new Forbidden());
  });

  it('should return not found when the army does not exist', async () => {
    const army = ArmyGenerator.random();
    const query = ListBattlesByArmyIdQueryGenerator.random();
    repository.whenMaterializeArmyByArmyIdThenReturn(army);

    const battles = await handler.handle(query);

    expect(battles.value).toStrictEqual(new ArmyNotFound());
  });
});
