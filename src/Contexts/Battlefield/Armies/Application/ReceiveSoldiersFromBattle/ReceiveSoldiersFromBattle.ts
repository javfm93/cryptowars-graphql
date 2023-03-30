import { UseCase, BaseUseCase } from '../../../../Shared/Domain/BaseUseCase';
import { EventBus } from '../../../../Shared/Domain/EventBus';
import { Result, Nothing, failure, success } from '../../../../Shared/Aplication/Result';
import { ArmyNotFound } from '../Find/ArmyNotFound';
import { Squads } from '../../Domain/Squads';
import { BattlefieldInternalEventRepository } from '../../../Shared/Domain/BattlefieldInternalEventRepository';
import { ArmyId } from '../../Domain/ArmyId';

type ReturnBattleSoldiersArgs = {
  armyId: ArmyId;
  squad: Squads;
};

type ReturnBattleSoldiersResult = Result<Nothing, ArmyNotFound>;

@UseCase()
export class ReceiveSoldiersFromBattle implements BaseUseCase<ReturnBattleSoldiersArgs, Nothing> {
  constructor(
    private eventRepository: BattlefieldInternalEventRepository,
    private eventBus: EventBus
  ) {}

  async execute({ armyId, squad }: ReturnBattleSoldiersArgs): Promise<ReturnBattleSoldiersResult> {
    const army = await this.eventRepository.materializeArmyByArmyId(armyId);
    if (!army) return failure(new ArmyNotFound());
    army.receiveSquadsFromBattle(squad);
    const events = army.pullDomainEvents();
    await this.eventRepository.save(events.map(event => event.toBattlefieldInternalEvent()));
    await this.eventBus.publish(events);
    return success();
  }
}
