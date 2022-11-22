import { Army } from '../../../../../src/Contexts/Battlefield/Armies/Domain/Army';
import { AttackExposedEventsGenerator } from '../../Attacks/Domain/AttackExposedEventsGenerator';
import { AttackGenerator } from '../../Attacks/Domain/AttackGenerator';
import { ArmyMaterializationEventsGenerator } from './ArmyMaterializationEventsGenerator';

describe('[Domain] Army', () => {
  it('should materialize an army that only recruits', async () => {
    const generator = new ArmyMaterializationEventsGenerator().createArmyWithSoldiers();

    const army = Army.materializeFrom(generator.generatedEvents);

    expect(army).toStrictEqual(generator.expectedArmy);
  });

  it('should materialize when an army sent a troop to attack', async () => {
    const generator = new ArmyMaterializationEventsGenerator()
      .createArmyWithSoldiers()
      .sendAttack();

    const army = Army.materializeFrom(generator.generatedEvents);

    expect(army).toStrictEqual(generator.expectedArmy);
  });

  it('should materialize when an army had a battle', async () => {
    const generator = new ArmyMaterializationEventsGenerator()
      .createArmyWithSoldiers()
      .sendAttack()
      .createBattle();

    const army = Army.materializeFrom(generator.generatedEvents);

    expect(army).toStrictEqual(generator.expectedArmy);
  });

  it('should materialize when an army receives an attack', async () => {
    const generator = new ArmyMaterializationEventsGenerator()
      .createArmyWithSoldiers()
      .createArmyAttacked();

    const army = Army.materializeFrom(generator.generatedEvents);

    expect(army).toStrictEqual(generator.expectedArmy);
  });

  it('should throw on unexpected event', async () => {
    const attackSent = AttackExposedEventsGenerator.attackSentFromAttack(
      AttackGenerator.random()
    ).toBattlefieldInternalEvent();
    try {
      Army.materializeFrom([attackSent]);
      fail('should throw');
    } catch (e: any) {
      expect(e.message).toStrictEqual(
        `Unknown event [${attackSent.id}] for army materialization with name ${attackSent.name}`
      );
    }
  });
});
