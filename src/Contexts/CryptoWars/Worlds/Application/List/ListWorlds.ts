import { WorldRepository } from '../../Domain/WorldRepository';
import { UseCase } from '../../../../Shared/Domain/UseCase';
import { Either, successAndReturn } from '../../../../Shared/Aplication/Result';
import { DomainError } from '../../../../Shared/Domain/Errors/DomainError';
import { Worlds } from '../../Domain/Worlds';

type ListWorldsResult = Either<Worlds, DomainError>;

export class ListWorlds implements UseCase<void, Worlds> {
  constructor(private worldRepository: WorldRepository) {}

  async execute(): Promise<ListWorldsResult> {
    return successAndReturn(await this.worldRepository.findAll());
  }
}
