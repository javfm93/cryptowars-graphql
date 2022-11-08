import { ArmyRepository } from '../../Domain/ArmyRepository';
import { UseCase } from '../../../../Shared/Domain/UseCase';
import { EventBus } from '../../../../Shared/Domain/EventBus';
import { Either, EmptyResult, failure, success } from '../../../../Shared/Aplication/Result';
import { ArmyId } from '../../Domain/ArmyId';
import { TownId } from '../../../../CryptoWars/Towns/domain/TownId';
import { ArmyNotFound } from '../Find/ArmyNotFound';
import { SquadPrimitives } from '../../Domain/Squads';
import { BattlefieldEventRepository } from '../../../Shared/Domain/BattlefieldEventRepository';

type RecruitSoldiersArgs = {
  id: ArmyId;
  townId: TownId;
  squad: SquadPrimitives;
};

type RecruitSoldiersResult = Either<EmptyResult, ArmyNotFound>;

export class RecruitSquad implements UseCase<RecruitSoldiersArgs, EmptyResult> {
  constructor(
    private armyRepository: ArmyRepository,
    private eventRepository: BattlefieldEventRepository,
    private eventBus: EventBus
  ) {}

  async execute({ id, townId, squad }: RecruitSoldiersArgs): Promise<RecruitSoldiersResult> {
    const army = await this.armyRepository.findByTownId(townId);
    if (!army) return failure(new ArmyNotFound());
    army.recruit(squad);
    await this.armyRepository.save(army);
    const events = army.pullDomainEvents();
    await this.eventRepository.save(events);
    await this.eventBus.publish(army.pullDomainEvents());
    return success();
  }
}
