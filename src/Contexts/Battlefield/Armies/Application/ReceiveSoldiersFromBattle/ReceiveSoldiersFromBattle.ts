import { UseCase } from '../../../../Shared/Domain/UseCase';
import { EventBus } from '../../../../Shared/Domain/EventBus';
import { Either, EmptyResult, failure, success } from '../../../../Shared/Aplication/Result';
import { TownId } from '../../../../CryptoWars/Towns/domain/TownId';
import { ArmyNotFound } from '../Find/ArmyNotFound';
import { Squads } from '../../Domain/Squads';
import { BattlefieldInternalEventRepository } from '../../../Shared/Domain/BattlefieldInternalEventRepository';

type ReturnBattleSoldiersArgs = {
  townId: TownId;
  squad: Squads;
};

type ReturnBattleSoldiersResult = Either<EmptyResult, ArmyNotFound>;

export class ReceiveSoldiersFromBattle implements UseCase<ReturnBattleSoldiersArgs, EmptyResult> {
  constructor(
    private eventRepository: BattlefieldInternalEventRepository,
    private eventBus: EventBus
  ) {}

  async execute({ townId, squad }: ReturnBattleSoldiersArgs): Promise<ReturnBattleSoldiersResult> {
    const army = await this.eventRepository.materializeArmyByArmyId(townId);
    if (!army) return failure(new ArmyNotFound());
    army.receiveSquadsFromBattle(squad);
    const events = army.pullDomainEvents();
    await this.eventRepository.save(events.map(event => event.toBattlefieldInternalEvent()));
    await this.eventBus.publish(events);
    return success();
  }
}
