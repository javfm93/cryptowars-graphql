import { ArmyRepository } from '../../Domain/ArmyRepository';
import { UseCase } from '../../../../Shared/Domain/UseCase';
import { Army } from '../../Domain/Army';
import { EventBus } from '../../../../Shared/Domain/EventBus';
import { Either, EmptyResult, success } from '../../../../Shared/Aplication/Result';
import { DomainError } from '../../../../Shared/Domain/Errors/DomainError';
import { ArmyId } from '../../Domain/ArmyId';
import { TownId } from '../../../../CryptoWars/Towns/domain/TownId';

type CreateArmyArgs = {
  id: ArmyId;
  townId: TownId;
};

type CreateArmyResult = Either<EmptyResult, DomainError>;

export class CreateArmy implements UseCase<CreateArmyArgs, EmptyResult> {
  constructor(private armyRepository: ArmyRepository, private eventBus: EventBus) {}

  async execute({ id, townId }: CreateArmyArgs): Promise<CreateArmyResult> {
    const army = Army.create(id, { townId });
    await this.armyRepository.save(army);
    await this.eventBus.publish(army.pullDomainEvents());
    return success();
  }
}
