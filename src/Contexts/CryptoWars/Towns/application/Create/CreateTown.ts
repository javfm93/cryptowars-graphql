import { TownRepository } from '../../domain/TownRepository';
import { UseCase } from '../../../../Shared/Domain/UseCase';
import { Uuid } from '../../../../Shared/Domain/value-object/Uuid';
import { EventBus } from '../../../../Shared/Domain/EventBus';
import { Town } from '../../Domain/Town';
import { Either, EmptyResult, success } from '../../../../Shared/Aplication/Result';
import { DomainError } from '../../../../Shared/Domain/Errors/DomainError';
import { PlayerId } from '../../../Players/Domain/PlayerId';

interface CreateUserArgs {
  id: Uuid;
  playerId: PlayerId;
}

type CreateTownResult = Either<EmptyResult, DomainError>;

export class CreateTown implements UseCase<CreateUserArgs, EmptyResult> {
  constructor(private townRepository: TownRepository, private eventBus: EventBus) {}

  async execute({ id, playerId }: CreateUserArgs): Promise<CreateTownResult> {
    const town = Town.create(id, { playerId });
    await this.townRepository.save(town);
    await this.eventBus.publish(town.pullDomainEvents());
    return success();
  }
}
