import { RegisterUseCase, UseCase } from '../../../../Shared/Domain/UseCase';
import { Attack } from '../../Domain/Attack';
import { EventBus } from '../../../../Shared/Domain/EventBus';
import {
  Either,
  EmptyResult,
  failure,
  success,
  successAndReturn
} from '../../../../Shared/Aplication/Result';
import { BattlefieldInternalEventRepository } from '../../../Shared/Domain/BattlefieldInternalEventRepository';
import { AttackId } from '../../Domain/AttackId';
import { TownId } from '../../../../CryptoWars/Towns/Domain/TownId';
import { PlayerId } from '../../../../CryptoWars/Players/Domain/PlayerId';
import { ArmyNotFound } from '../../../Armies/Application/Find/ArmyNotFound';
import { Forbidden } from '../../../../Shared/Domain/Errors/Forbidden';
import { AttackAlreadyExist } from './AttackAlreadyExist';
import { AttackTroop } from '../../Domain/AttackTroop';
import { AttackArrivedDomainEvent } from '../../Domain/AttackArrivedDomainEvent';
import { InvalidNumberOfSoldiers } from '../../../../CryptoWars/Towns/Domain/InvalidNumberOfSoldiers';
import { FindArmyByArmyIdQuery } from '../../../Armies/Application/Find/FindArmyByArmyIdQuery';
import { QueryBus } from '../../../../Shared/Domain/QueryBus';
import { FindArmyByArmyIdQueryResult } from '../../../Armies/Application/Find/FindArmyByArmyIdQueryHandler';
import { Army } from '../../../Armies/Domain/Army';

type SendAttackArgs = {
  id: AttackId;
  attackerTroop: AttackTroop;
  defenderTownId: TownId;
  playerId: PlayerId;
};

type SendAttackResult = Either<EmptyResult, ArmyNotFound | Forbidden>;

@RegisterUseCase()
export class SendAttack implements UseCase<SendAttackArgs, EmptyResult> {
  constructor(
    private eventRepository: BattlefieldInternalEventRepository,
    private queryBus: QueryBus,
    private eventBus: EventBus
  ) {}

  async execute(args: SendAttackArgs): Promise<SendAttackResult> {
    const attackAlreadyExist = await this.eventRepository.findOneByAggregateId(args.id);
    if (attackAlreadyExist) return failure(new AttackAlreadyExist());

    const attackerArmyResult = await this.getAttackerArmy(args);
    if (attackerArmyResult.isFailure()) return failure(attackerArmyResult.value);
    const attacker = attackerArmyResult.value;

    const defenderArmy = await this.eventRepository.materializeArmyByTownId(args.defenderTownId);
    if (!defenderArmy) return failure(new ArmyNotFound());

    const attack = Attack.create(args.id, args.attackerTroop, defenderArmy.id);
    attacker.sendSquadsToAttack(args.attackerTroop.squads);
    const events = attack.pullDomainEvents().concat(attacker.pullDomainEvents());
    await this.eventRepository.save(events.map(event => event.toBattlefieldInternalEvent()));

    // we don't have scheduler yet so the attack is automatically triggered
    const attackArrived = new AttackArrivedDomainEvent({ aggregateId: attack.id.toString() });
    await this.eventBus.publish([...events, attackArrived]);
    return success();
  }

  private async getAttackerArmy(args: SendAttackArgs): Promise<Either<Army, ArmyNotFound>> {
    const query = new FindArmyByArmyIdQuery({
      armyId: args.attackerTroop.armyId.toString(),
      playerId: args.playerId.toString()
    });
    const attackerArmyResult = await this.queryBus.ask<FindArmyByArmyIdQueryResult>(query);
    if (attackerArmyResult.isFailure()) return failure(attackerArmyResult.value);
    if (!attackerArmyResult.value.hasEnoughSoldiersToCreate(args.attackerTroop.squads))
      return failure(new InvalidNumberOfSoldiers());
    return successAndReturn(attackerArmyResult.value);
  }
}
