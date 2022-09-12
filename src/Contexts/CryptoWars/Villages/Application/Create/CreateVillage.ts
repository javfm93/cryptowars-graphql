import { VillageRepository } from '../../Domain/VillageRepository';
import { UseCase } from '../../../../Shared/Domain/UseCase';
import { Uuid } from '../../../../Shared/Domain/value-object/Uuid';
import { EventBus } from '../../../../Shared/Domain/EventBus';
import { Village } from '../../Domain/Village';
import { Either, EmptyResult, success } from '../../../../Shared/Aplication/Result';
import { DomainError } from '../../../../Shared/Domain/Errors/DomainError';

interface CreateUserArgs {
  id: Uuid;
}

type CreateVillageResult = Either<EmptyResult, DomainError>;

export class CreateVillage implements UseCase<CreateUserArgs, EmptyResult> {
  constructor(private villageRepository: VillageRepository, private eventBus: EventBus) {}

  async execute({ id }: CreateUserArgs): Promise<CreateVillageResult> {
    const village = Village.create(id);
    await this.villageRepository.save(village);
    await this.eventBus.publish(village.pullDomainEvents());
    return success();
  }
}
