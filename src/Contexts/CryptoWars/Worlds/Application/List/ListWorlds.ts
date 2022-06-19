import { WorldRepository } from '../../Domain/WorldRepository';
import { UseCase } from '../../../../Shared/Domain/UseCase';
import { World } from '../../Domain/World';
import { Either, successAndReturn } from '../../../../Shared/Aplication/Result';
import { DomainError } from '../../../Users/Domain/Errors/DomainError';

type ListWorldsResult = Either<Array<World>, DomainError>;

export class ListWorlds implements UseCase<void, Array<World>> {
  constructor(private worldRepository: WorldRepository) {}

  async execute(): Promise<ListWorldsResult> {
    return successAndReturn(await this.worldRepository.getAll());
  }
}
