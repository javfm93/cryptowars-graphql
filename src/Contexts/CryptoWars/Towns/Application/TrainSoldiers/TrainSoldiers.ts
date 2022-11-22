import { TownRepository } from '../../Domain/TownRepository';
import { TownNotFound } from './TownNotFound';
import { Either, EmptyResult, failure, success } from '../../../../Shared/Aplication/Result';
import { TownId } from '../../Domain/TownId';
import { UseCase } from '../../../../Shared/Domain/UseCase';
import { EventBus } from '../../../../Shared/Domain/EventBus';
import { TownSoldiers } from '../../Domain/TownSoldiers';
import { Forbidden } from '../../../../Shared/Domain/Errors/Forbidden';
import { PlayerId } from '../../../Players/Domain/PlayerId';

type TrainSoldiersArgs = {
  playerId: PlayerId;
  townId: TownId;
  soldiers: TownSoldiers;
};

export type TrainSoldiersResult = Either<EmptyResult, TownNotFound | Forbidden>;

export class TrainSoldiers implements UseCase<TrainSoldiersArgs, EmptyResult> {
  constructor(private townRepository: TownRepository, private eventBus: EventBus) {}

  async execute({ townId, soldiers, playerId }: TrainSoldiersArgs): Promise<TrainSoldiersResult> {
    const town = await this.townRepository.findById(townId);
    if (!town) return failure(new TownNotFound());
    if (!town.isManagedBy(playerId)) return failure(new Forbidden());
    town.updateWarehouseAssets();
    if (!town.hasEnoughAssetsToTrain(soldiers)) return failure(new Forbidden());
    // as we dont have scheduler, the soldier is automatically trained,
    // im missing the soldiers train started event
    town.train(soldiers);
    await this.townRepository.save(town);
    await this.eventBus.publish(town.pullDomainEvents());
    return success();
  }
}
