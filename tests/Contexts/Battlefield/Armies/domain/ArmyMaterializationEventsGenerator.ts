import { BattlefieldInternalEvent } from '../../../../../src/Contexts/Battlefield/Shared/Domain/BattlefieldInternalEvent';
import { Army } from '../../../../../src/Contexts/Battlefield/Armies/Domain/Army';
import { ArmyGenerator } from './ArmyGenerator';
import { ArmyExposedEventsGenerator } from './ArmyExposedEventsGenerator';
import { SquadsGenerator } from './SquadsGenerator';
import { BattleGenerator } from '../../Battles/Domain/BattleGenerator';

export class ArmyMaterializationEventsGenerator {
  public generatedEvents: Array<BattlefieldInternalEvent> = [];
  public expectedArmy: Army = ArmyGenerator.random();

  private createArmy = (): ArmyMaterializationEventsGenerator => {
    const armyCreated = ArmyExposedEventsGenerator.ArmyCreated(
      this.expectedArmy
    ).toBattlefieldInternalEvent();
    this.generatedEvents.push(armyCreated);
    return this;
  };

  private recruitSoldiers = (): ArmyMaterializationEventsGenerator => {
    const soldiersRecruited = ArmyExposedEventsGenerator.SoldiersRecruited(
      this.expectedArmy.id,
      this.expectedArmy.squads
    ).toBattlefieldInternalEvent();
    this.generatedEvents.push(soldiersRecruited);
    return this;
  };

  createArmyWithSoldiers = (): ArmyMaterializationEventsGenerator => {
    this.createArmy().recruitSoldiers();
    return this;
  };

  sendAttack = (): ArmyMaterializationEventsGenerator => {
    const squadsToAttack = SquadsGenerator.randomBetween1and9();
    const soldiersSent = ArmyExposedEventsGenerator.SoldiersSentToAttack(
      this.expectedArmy.id,
      squadsToAttack
    ).toBattlefieldInternalEvent();
    const squadsLeft = this.expectedArmy.squads.value.basic - squadsToAttack.value.basic;
    const expectedArmy = ArmyGenerator.create(
      this.expectedArmy.id,
      this.expectedArmy.townId,
      this.expectedArmy.playerId,
      SquadsGenerator.withNSoldiers(squadsLeft)
    );
    this.generatedEvents.push(soldiersSent);
    this.expectedArmy = expectedArmy;
    return this;
  };

  createBattle = (): ArmyMaterializationEventsGenerator => {
    const battle = BattleGenerator.randomForAttacker(this.expectedArmy.id);
    const soldiersReceived = ArmyExposedEventsGenerator.SoldiersFromBattleReceived(battle);
    const finalSquads = this.expectedArmy.squads.value.basic + soldiersReceived.squads.basic;
    const expectedArmy = ArmyGenerator.create(
      this.expectedArmy.id,
      this.expectedArmy.townId,
      this.expectedArmy.playerId,
      SquadsGenerator.withNSoldiers(finalSquads)
    );
    this.generatedEvents.push(soldiersReceived.toBattlefieldInternalEvent());
    this.expectedArmy = expectedArmy;
    return this;
  };

  createArmyAttacked = (): ArmyMaterializationEventsGenerator => {
    const battle = BattleGenerator.randomForAttacker(this.expectedArmy.id);
    const armyAttacked = ArmyExposedEventsGenerator.ArmyAttackedIn(battle);
    const finalSquads = this.expectedArmy.squads.value.basic - armyAttacked.casualties.basic;
    const expectedArmy = ArmyGenerator.create(
      this.expectedArmy.id,
      this.expectedArmy.townId,
      this.expectedArmy.playerId,
      SquadsGenerator.withNSoldiers(finalSquads)
    );
    this.generatedEvents.push(armyAttacked.toBattlefieldInternalEvent());
    this.expectedArmy = expectedArmy;
    return this;
  };
}
