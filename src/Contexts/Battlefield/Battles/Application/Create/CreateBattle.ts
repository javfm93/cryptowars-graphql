import { UseCase } from '../../../../Shared/Domain/UseCase';
import { EventBus } from '../../../../Shared/Domain/EventBus';
import { Either, EmptyResult, failure, success } from '../../../../Shared/Aplication/Result';
import { BattlefieldInternalEventRepository } from '../../../Shared/Domain/BattlefieldInternalEventRepository';
import { ArmyNotFound } from '../../../Armies/Application/Find/ArmyNotFound';
import { Forbidden } from '../../../../Shared/Domain/Errors/Forbidden';
import { AttackId } from '../../../Attacks/Domain/AttackId';
import { Battle } from '../../Domain/Battle';
import { BattleId } from '../../Domain/BattleId';
import { AttackNotFound } from '../../../Attacks/Application/Send/AttackNotFound';
import { BattleTroopReturnedDomainEvent } from '../../Domain/BattleTroopReturnedDomainEvent';
import { Squads } from '../../../Armies/Domain/Squads';

type CreateBattleResult = Either<EmptyResult, ArmyNotFound | Forbidden>;

type CreateBattleArgs = {
  id: BattleId;
  attackId: AttackId;
};

export class CreateBattle implements UseCase<CreateBattleArgs, EmptyResult> {
  constructor(
    private eventRepository: BattlefieldInternalEventRepository,
    private eventBus: EventBus
  ) {}

  async execute({ id, attackId }: CreateBattleArgs): Promise<CreateBattleResult> {
    const attack = await this.eventRepository.materializeAttackById(attackId);
    if (!attack) return failure(new AttackNotFound(attackId.toString()));

    const defenderArmy = await this.eventRepository.materializeArmyByArmyId(attack.defenderArmyId);
    if (!defenderArmy) return failure(new ArmyNotFound(attack.defenderArmyId.toString()));

    const battle = Battle.create(id, attack, defenderArmy);
    console.log(
      'attacker troops:',
      attack.attackerTroop.squads.basic.soldiers,
      'defender',
      defenderArmy.squads.basic.soldiers,
      'to return',
      battle.result
    );
    defenderArmy.applyBattleImpact(Squads.fromTownSoldiers(battle.result.defenderCasualties));

    const events = battle.pullDomainEvents().concat(defenderArmy.pullDomainEvents());
    await this.eventRepository.save(events.map(event => event.toBattlefieldInternalEvent()));

    // as we dont have scheduler yet, the attacker troops are returned automatically
    const troopReturned = new BattleTroopReturnedDomainEvent({
      aggregateId: battle.id.toString(),
      troop: battle.result.returningTroop
    });
    await this.eventBus.publish([...events, troopReturned]);
    return success();
  }
}
