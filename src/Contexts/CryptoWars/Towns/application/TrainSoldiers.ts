import { TownRepository } from '../domain/TownRepository';
import { TownNotFound } from './TownNotFound';
import { Either, EmptyResult, failure, success } from '../../../Shared/Aplication/Result';
import { TownId } from '../domain/TownId';
import { UseCase } from '../../../Shared/Domain/UseCase';
import { EventBus } from '../../../Shared/Domain/EventBus';
import { TownSoldierTrainFinished } from '../domain/TownSoldierTrainFinishedDomainEvent';
import { TownSoldiers } from '../domain/TownSoldiers';

type TrainSoldiersArgs = {
  townId: TownId;
  soldiers: TownSoldiers;
};

export type TrainSoldiersResult = Either<EmptyResult, TownNotFound>;

export class TrainSoldiers implements UseCase<TrainSoldiersArgs, EmptyResult> {
  constructor(private townRepository: TownRepository, private eventBus: EventBus) {}

  async execute({ townId, soldiers }: TrainSoldiersArgs): Promise<TrainSoldiersResult> {
    const town = await this.townRepository.findById(townId);
    if (!town) return failure(new TownNotFound());
    const event = new TownSoldierTrainFinished({ id: townId.toString(), soldiers });
    await this.eventBus.publish([event]);
    return success();
  }
}