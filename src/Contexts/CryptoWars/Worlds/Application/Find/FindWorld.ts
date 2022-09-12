import { UseCase } from '../../../../Shared/Domain/UseCase';
import { Either, failure, successAndReturn } from '../../../../Shared/Aplication/Result';
import { World } from '../../Domain/World';
import { WorldRepository } from '../../Domain/WorldRepository';
import { WorldId } from '../../Domain/WorldId';
import { DomainError } from '../../../../Shared/Domain/Errors/DomainError';
import { WorldNotFound } from './WorldNotFound';

type FindWorldResult = Either<World, DomainError>;

export class FindWorld implements UseCase<WorldId, World> {
  constructor(private worldRepository: WorldRepository) {}

  async execute(worldId: WorldId): Promise<FindWorldResult> {
    const world = await this.worldRepository.findById(worldId);
    return world ? successAndReturn(world) : failure(new WorldNotFound());
  }
}
