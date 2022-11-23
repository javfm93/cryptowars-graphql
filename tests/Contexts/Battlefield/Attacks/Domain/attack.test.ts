import { AttackExposedEventsGenerator } from '../../Attacks/Domain/AttackExposedEventsGenerator';
import { AttackGenerator } from '../../Attacks/Domain/AttackGenerator';
import { Attack } from '../../../../../src/Contexts/Battlefield/Attacks/Domain/Attack';
import { BattleExposedEventsGenerator } from '../../Battles/Domain/BattleExposedEventsGenerator';
import { BattleGenerator } from '../../Battles/Domain/BattleGenerator';
import { mockTimeCleanUp, mockTimeSetup } from '../../../Shared/__mocks__/MockTime';

describe('[Domain] Attack', () => {
  beforeAll(mockTimeSetup);
  afterAll(mockTimeCleanUp);

  it('should materialize a sent attack', async () => {
    const expectedAttack = AttackGenerator.random();
    const attackSent = AttackExposedEventsGenerator.attackSentFromAttack(expectedAttack);

    const attack = Attack.materializeFrom([attackSent.toBattlefieldInternalEvent()]);

    expect(attack).toStrictEqual(expectedAttack);
  });

  it('should materialize an attack that was sent and arrived', async () => {
    const expectedAttack = AttackGenerator.random();
    const attackSent =
      AttackExposedEventsGenerator.attackSentFromAttack(
        expectedAttack
      ).toBattlefieldInternalEvent();
    const attackArrived = AttackExposedEventsGenerator.attackArrivedFor(
      attackSent.aggregateId
    ).toBattlefieldInternalEvent();

    const attack = Attack.materializeFrom([attackSent, attackArrived]);

    expect(attack).toStrictEqual(expectedAttack);
  });

  it('should throw on unexpected event', async () => {
    const battleCreated = BattleExposedEventsGenerator.battleCreatedFor(
      BattleGenerator.random()
    ).toBattlefieldInternalEvent();
    try {
      Attack.materializeFrom([battleCreated]);
      fail('should throw');
    } catch (e: any) {
      expect(e.message).toStrictEqual(
        `Unknown event [${battleCreated.id}] for attack materialization with name ${battleCreated.name}`
      );
    }
  });
});
