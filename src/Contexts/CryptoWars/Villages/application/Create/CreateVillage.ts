import { VillageRepository } from '../../domain/VillageRepository';
import { UseCase } from '../../../../Shared/domain/UseCase';
import { Uuid } from '../../../../Shared/domain/value-object/Uuid';
import { EventBus } from '../../../../Shared/domain/EventBus';
import { Village } from '../../domain/Village';

interface CreateUserArgs {
  id: Uuid;
}

export class CreateVillage implements UseCase<CreateUserArgs, void> {
  constructor(private villageRepository: VillageRepository, private eventBus: EventBus) {}

  async execute({ id }: CreateUserArgs): Promise<void> {
    const village = Village.create(id);
    await this.villageRepository.save(village);
    await this.eventBus.publish(village.pullDomainEvents());
  }
}
