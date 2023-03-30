import { UseCase, BaseUseCase } from '../../../../Shared/Domain/BaseUseCase';
import { EventBus } from '../../../../Shared/Domain/EventBus';
import { Result, Nothing, failure, success } from '../../../../Shared/Aplication/Result';
import { BattlefieldInternalEventRepository } from '../../../Shared/Domain/BattlefieldInternalEventRepository';
import { ArmyNotFound } from '../../../Armies/Application/Find/ArmyNotFound';
import { Forbidden } from '../../../../Shared/Domain/Errors/Forbidden';
import { AttackId } from '../../../Attacks/Domain/AttackId';
import { Battle } from '../../Domain/Battle';
import { BattleId } from '../../Domain/BattleId';
import { AttackNotFound } from '../../../Attacks/Application/Send/AttackNotFound';
import { BattleTroopReturnedDomainEvent } from '../../Domain/BattleTroopReturnedDomainEvent';

type CreateBattleResult = Result<Nothing, ArmyNotFound | Forbidden | AttackNotFound>;

type CreateBattleArgs = {
  id: BattleId;
  attackId: AttackId;
};

@UseCase()
export class CreateBattle implements BaseUseCase<CreateBattleArgs, Nothing> {
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
    defenderArmy.applyBattleImpact(battle.result.defenderCasualties);

    const events = battle.pullDomainEvents().concat(defenderArmy.pullDomainEvents());
    await this.eventRepository.save(events.map(event => event.toBattlefieldInternalEvent()));

    // as we dont have scheduler yet, the attacker troops are returned automatically
    const troopReturned = new BattleTroopReturnedDomainEvent({
      aggregateId: battle.id.toString(),
      attributes: {
        troop: battle.result.returningTroop.toPrimitives()
      }
    });
    await this.eventBus.publish([...events, troopReturned]);
    return success();
  }
}
