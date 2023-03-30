import { WorldRepository } from '../../Domain/WorldRepository';
import { UseCase, BaseUseCase } from '../../../../Shared/Domain/BaseUseCase';
import { Result, successAndReturn } from '../../../../Shared/Aplication/Result';
import { DomainError } from '../../../../Shared/Domain/Errors/DomainError';
import { Worlds } from '../../Domain/Worlds';

type ListWorldsResult = Result<Worlds, DomainError>;

@UseCase()
export class ListWorlds implements BaseUseCase<void, Worlds> {
  constructor(private worldRepository: WorldRepository) {}

  async execute(): Promise<ListWorldsResult> {
    return successAndReturn(await this.worldRepository.findAll());
  }
}
