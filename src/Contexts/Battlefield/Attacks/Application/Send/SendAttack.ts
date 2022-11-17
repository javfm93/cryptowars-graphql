import { UseCase } from '../../../../Shared/Domain/UseCase';
import { Attack } from '../../Domain/Attack';
import { EventBus } from '../../../../Shared/Domain/EventBus';
import { Either, EmptyResult, failure, success } from '../../../../Shared/Aplication/Result';
import { BattlefieldInternalEventRepository } from '../../../Shared/Domain/BattlefieldInternalEventRepository';
import { AttackId } from '../../Domain/AttackId';
import { TownId } from '../../../../CryptoWars/Towns/domain/TownId';
import { PlayerId } from '../../../../CryptoWars/Players/Domain/PlayerId';
import { ArmyNotFound } from '../../../Armies/Application/Find/ArmyNotFound';
import { Forbidden } from '../../../../Shared/Domain/Errors/Forbidden';
import { AttackAlreadyExist } from './AttackAlreadyExist';
import { AttackTroop } from '../../Domain/AttackTroop';
import { AttackArrivedDomainEvent } from '../../Domain/AttackArrivedDomainEvent';
import { InvalidNumberOfSoldiers } from '../../../../CryptoWars/Towns/domain/InvalidNumberOfSoldiers';
import { FindArmyByArmyIdQuery } from '../../../Armies/Application/Find/FindArmyByArmyIdQuery';
import { QueryBus } from '../../../../Shared/Domain/QueryBus';
import { FindArmyByArmyIdQueryResult } from '../../../Armies/Application/Find/FindArmyByArmyIdQueryHandler';

type SendAttackArgs = {
  id: AttackId;
  attackerTroop: AttackTroop;
  defenderTownId: TownId;
  playerId: PlayerId;
};

type SendAttackResult = Either<EmptyResult, ArmyNotFound | Forbidden>;

export class SendAttack implements UseCase<SendAttackArgs, EmptyResult> {
  constructor(
    private eventRepository: BattlefieldInternalEventRepository,
    private queryBus: QueryBus,
    private eventBus: EventBus
  ) {}

  async execute(args: SendAttackArgs): Promise<SendAttackResult> {
    const validation = await this.validateAttacker(args);
    if (validation.isFailure()) return failure(validation.value);
    const defenderArmy = await this.eventRepository.materializeArmyByTownId(args.defenderTownId);
    if (!defenderArmy) return failure(new ArmyNotFound());
    const attack = Attack.create(args.id, args.attackerTroop, defenderArmy.id);
    const events = attack.pullDomainEvents();
    await this.eventRepository.save(events.map(event => event.toBattlefieldInternalEvent()));
    // we don't have scheduler yet so the attack is automatically triggered
    const attackArrived = new AttackArrivedDomainEvent({ aggregateId: attack.id.toString() });
    await this.eventBus.publish([...events, attackArrived]);
    return success();
  }

  private async validateAttacker(args: SendAttackArgs): Promise<SendAttackResult> {
    const query = new FindArmyByArmyIdQuery({
      armyId: args.attackerTroop.armyId.toString(),
      playerId: args.playerId.toString()
    });
    const attackerArmyResult = await this.queryBus.ask<FindArmyByArmyIdQueryResult>(query);
    if (attackerArmyResult.isFailure()) return failure(attackerArmyResult.value);
    if (!attackerArmyResult.value.hasEnoughSoldiersToCreate(args.attackerTroop.squads))
      return failure(new InvalidNumberOfSoldiers());
    const attackAlreadyExist = await this.eventRepository.findOneByAggregateId(args.id);
    if (attackAlreadyExist) return failure(new AttackAlreadyExist());
    return success();
  }
}
