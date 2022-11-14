import { UseCase } from '../../../../Shared/Domain/UseCase';
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
import { QueryBus } from '../../../../Shared/Domain/QueryBus';
import { AttackId } from '../../Domain/AttackId';
import { TownId } from '../../../../CryptoWars/Towns/domain/TownId';
import { PlayerId } from '../../../../CryptoWars/Players/Domain/PlayerId';
import { FindArmyByTownQuery } from '../../../Armies/Application/Find/FindArmyByTownQuery';
import { FindArmyByTownQueryResult } from '../../../Armies/Application/Find/FindArmyByTownQueryHandler';
import { ArmyNotFound } from '../../../Armies/Application/Find/ArmyNotFound';
import { Forbidden } from '../../../../Shared/Domain/Errors/Forbidden';
import { AttackAlreadyExist } from './AttackAlreadyExist';
import { AttackTroop } from '../../Domain/AttackTroop';
import { Army } from '../../../Armies/Domain/Army';
import { DomainError } from '../../../../Shared/Domain/Errors/DomainError';
import { AttackArrivedDomainEvent } from '../../Domain/AttackArrivedDomainEvent';

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
    const defenderArmyResult = await this.findDefenderArmy(args);
    if (defenderArmyResult.isFailure()) return failure(defenderArmyResult.value);
    const attack = Attack.create(args.id, args.attackerTroop, defenderArmyResult.value.id);
    const events = attack.pullDomainEvents();
    await this.eventRepository.save(events.map(event => event.toBattlefieldInternalEvent()));
    // we don't have scheduler yet so the attack is automatically triggered
    const attackArrived = new AttackArrivedDomainEvent({ aggregateId: attack.id.toString() });
    await this.eventBus.publish([...events, attackArrived]);
    return success();
  }

  private async validateAttacker(args: SendAttackArgs): Promise<SendAttackResult> {
    const attackerArmy = await this.eventRepository.materializeArmyByArmyId(
      args.attackerTroop.armyId
    );
    if (!attackerArmy) return failure(new ArmyNotFound(args.attackerTroop.armyId.toString()));
    if (!attackerArmy.isCommandedBy(args.playerId)) return failure(new Forbidden());
    const attackAlreadyExist = await this.eventRepository.findOneByAggregateId(args.id);
    if (attackAlreadyExist) return failure(new AttackAlreadyExist());
    return success();
  }

  private async findDefenderArmy(args: SendAttackArgs): Promise<Either<Army, DomainError>> {
    const query = new FindArmyByTownQuery({
      playerId: args.playerId.toString(),
      townId: args.defenderTownId.toString()
    });
    const defenderArmyResult: FindArmyByTownQueryResult = await this.queryBus.ask(query);
    if (defenderArmyResult.isFailure()) return failure(defenderArmyResult.value);
    else return successAndReturn(defenderArmyResult.value);
  }
}
