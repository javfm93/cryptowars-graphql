import { TownRepository } from '../domain/TownRepository';
import { TownNotFound } from './TownNotFound';
import { Either, EmptyResult, failure, success } from '../../../Shared/Aplication/Result';
import { TownId } from '../domain/TownId';
import { UseCase } from '../../../Shared/Domain/UseCase';
import { EventBus } from '../../../Shared/Domain/EventBus';
import { TownSoldierTrainFinished } from '../domain/TownSoldierTrainFinishedDomainEvent';
import { TownSoldiers } from '../domain/TownSoldiers';
import { UserId } from '../../../IAM/Users/Domain/UserId';
import { FindPlayerQuery } from '../../Players/Application/Find/FindPlayerQuery';
import { QueryBus } from '../../../Shared/Domain/QueryBus';
import { FindPlayerQueryResult } from '../../Players/Application/Find/FindPlayerQueryHandler';
import { Forbidden } from '../../Shared/Domain/Forbidden';

type TrainSoldiersArgs = {
  userId: UserId;
  townId: TownId;
  soldiers: TownSoldiers;
};

export type TrainSoldiersResult = Either<EmptyResult, TownNotFound | Forbidden>;

export class TrainSoldiers implements UseCase<TrainSoldiersArgs, EmptyResult> {
  constructor(
    private townRepository: TownRepository,
    private queryBus: QueryBus,
    private eventBus: EventBus
  ) {}

  async execute({ townId, soldiers, userId }: TrainSoldiersArgs): Promise<TrainSoldiersResult> {
    const town = await this.townRepository.findById(townId);
    if (!town) return failure(new TownNotFound());

    const query = new FindPlayerQuery({ userId: userId.toString() });
    const player: FindPlayerQueryResult = await this.queryBus.ask(query);
    if (player.isFailure()) return failure(new Forbidden());
    if (!player.value.isOwnerOf(town)) return failure(new Forbidden());

    const event = new TownSoldierTrainFinished({ id: townId.toString(), soldiers: soldiers.value });
    await this.eventBus.publish([event]);
    return success();
  }
}
