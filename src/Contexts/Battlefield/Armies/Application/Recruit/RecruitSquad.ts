import { UseCase, BaseUseCase } from '../../../../Shared/Domain/BaseUseCase';
import { EventBus } from '../../../../Shared/Domain/EventBus';
import { Result, Nothing, failure, success } from '../../../../Shared/Aplication/Result';
import { TownId } from '../../../../CryptoWars/Towns/Domain/TownId';
import { ArmyNotFound } from '../Find/ArmyNotFound';
import { Squads } from '../../Domain/Squads';
import { BattlefieldInternalEventRepository } from '../../../Shared/Domain/BattlefieldInternalEventRepository';
import { logger } from '../../../../Shared/Infrastructure/WinstonLogger';

type RecruitSoldiersArgs = {
  townId: TownId;
  squads: Squads;
};

type RecruitSoldiersResult = Result<Nothing, ArmyNotFound>;

@UseCase()
export class RecruitSquad implements BaseUseCase<RecruitSoldiersArgs, Nothing> {
  constructor(
    private eventRepository: BattlefieldInternalEventRepository,
    private eventBus: EventBus
  ) {}

  async execute({ townId, squads }: RecruitSoldiersArgs): Promise<RecruitSoldiersResult> {
    const army = await this.eventRepository.materializeArmyByTownId(townId);
    if (!army) return failure(new ArmyNotFound());
    army.recruit(squads);
    const events = army.pullDomainEvents();
    logger.info(`saving events ${events.map(e => e.type).join(' ^ ')}`);
    await this.eventRepository.save(events.map(event => event.toBattlefieldInternalEvent()));
    await this.eventBus.publish(events);
    logger.debug(`${squads.value.basic} basic soldiers added to army ${army.id.toString()} squad`);
    return success();
  }
}
