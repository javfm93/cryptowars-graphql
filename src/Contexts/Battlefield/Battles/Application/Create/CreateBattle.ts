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
    const events = battle.pullDomainEvents();
    await this.eventRepository.save(events.map(event => event.toBattlefieldInternalEvent()));
    await this.eventBus.publish(events);
    return success();
  }
}