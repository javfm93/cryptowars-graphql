import { UseCase, BaseUseCase } from '../../../../Shared/Domain/BaseUseCase';
import { Result, failure, successAndReturn } from '../../../../Shared/Aplication/Result';
import { World } from '../../Domain/World';
import { WorldRepository } from '../../Domain/WorldRepository';
import { WorldId } from '../../Domain/WorldId';
import { WorldNotFound } from './WorldNotFound';

export type FindWorldErrors = WorldNotFound;
type FindWorldResult = Result<World, FindWorldErrors>;

@UseCase()
export class FindWorld implements BaseUseCase<WorldId, World> {
  constructor(private worldRepository: WorldRepository) {}

  async execute(worldId: WorldId): Promise<FindWorldResult> {
    const world = await this.worldRepository.findById(worldId);
    return world ? successAndReturn(world) : failure(new WorldNotFound());
  }
}
