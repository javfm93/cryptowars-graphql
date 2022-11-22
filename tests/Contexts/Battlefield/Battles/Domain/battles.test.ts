import { BattleExposedEventsGenerator } from './BattleExposedEventsGenerator';
import { BattleGenerator } from './BattleGenerator';
import { Battle } from '../../../../../src/Contexts/Battlefield/Battles/Domain/Battle';
import { AttackExposedEventsGenerator } from '../../Attacks/Domain/AttackExposedEventsGenerator';
import { AttackGenerator } from '../../Attacks/Domain/AttackGenerator';
import { mockTimeCleanUp, mockTimeSetup } from '../../../Shared/__mocks__/MockTime';

describe('[Domain] Battle', () => {
  beforeAll(mockTimeSetup);
  afterAll(mockTimeCleanUp);

  it('should materialize a created battle', async () => {
    const expectedBattle = BattleGenerator.random();
    const battleCreated = BattleExposedEventsGenerator.battleCreatedFor(expectedBattle);

    const battle = Battle.materializeFrom([battleCreated.toBattlefieldInternalEvent()]);

    expect(battle).toStrictEqual(expectedBattle);
  });

  it('should materialize a battle which returned troop', async () => {
    const expectedBattle = BattleGenerator.random();
    const battleCreated =
      BattleExposedEventsGenerator.battleCreatedFor(expectedBattle).toBattlefieldInternalEvent();
    const battleTroopReturned =
      BattleExposedEventsGenerator.battleTroopReturned(expectedBattle).toBattlefieldInternalEvent();

    const battle = Battle.materializeFrom([battleCreated, battleTroopReturned]);

    expect(battle).toStrictEqual(expectedBattle);
  });

  it('should throw on unexpected event', async () => {
    const attackSent = AttackExposedEventsGenerator.attackSentFromAttack(
      AttackGenerator.random()
    ).toBattlefieldInternalEvent();
    try {
      Battle.materializeFrom([attackSent]);
      fail('should throw');
    } catch (e: any) {
      expect(e.message).toStrictEqual(
        `Unknown event [${attackSent.id}] for battle materialization with name ${attackSent.name}`
      );
    }
  });
});
