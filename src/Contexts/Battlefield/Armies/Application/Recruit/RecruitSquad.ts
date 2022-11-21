import { UseCase } from '../../../../Shared/Domain/UseCase';
import { EventBus } from '../../../../Shared/Domain/EventBus';
import { Either, EmptyResult, failure, success } from '../../../../Shared/Aplication/Result';
import { TownId } from '../../../../CryptoWars/Towns/Domain/TownId';
import { ArmyNotFound } from '../Find/ArmyNotFound';
import { Squads } from '../../Domain/Squads';
import { BattlefieldInternalEventRepository } from '../../../Shared/Domain/BattlefieldInternalEventRepository';

type RecruitSoldiersArgs = {
  townId: TownId;
  squad: Squads;
};

type RecruitSoldiersResult = Either<EmptyResult, ArmyNotFound>;

export class RecruitSquad implements UseCase<RecruitSoldiersArgs, EmptyResult> {
  constructor(
    private eventRepository: BattlefieldInternalEventRepository,
    private eventBus: EventBus
  ) {}

  async execute({ townId, squad }: RecruitSoldiersArgs): Promise<RecruitSoldiersResult> {
    const army = await this.eventRepository.materializeArmyByTownId(townId);
    if (!army) return failure(new ArmyNotFound());
    army.recruit(squad);
    const events = army.pullDomainEvents();
    await this.eventRepository.save(events.map(event => event.toBattlefieldInternalEvent()));
    await this.eventBus.publish(events);
    return success();
  }
}
