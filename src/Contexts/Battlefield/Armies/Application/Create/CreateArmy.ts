import { UseCase } from '../../../../Shared/Domain/UseCase';
import { Army } from '../../Domain/Army';
import { EventBus } from '../../../../Shared/Domain/EventBus';
import { Either, EmptyResult, success } from '../../../../Shared/Aplication/Result';
import { DomainError } from '../../../../Shared/Domain/Errors/DomainError';
import { ArmyId } from '../../Domain/ArmyId';
import { TownId } from '../../../../CryptoWars/Towns/domain/TownId';
import { PlayerId } from '../../../../CryptoWars/Players/Domain/PlayerId';
import { BattlefieldInternalEventRepository } from '../../../Shared/Domain/BattlefieldInternalEventRepository';

type CreateArmyArgs = {
  id: ArmyId;
  playerId: PlayerId;
  townId: TownId;
};

type CreateArmyResult = Either<EmptyResult, DomainError>;

export class CreateArmy implements UseCase<CreateArmyArgs, EmptyResult> {
  constructor(
    private eventRepository: BattlefieldInternalEventRepository,
    private eventBus: EventBus
  ) {}

  async execute({ id, townId, playerId }: CreateArmyArgs): Promise<CreateArmyResult> {
    const army = Army.create(id, { townId, playerId });
    const events = army.pullDomainEvents();
    await this.eventRepository.save(events.map(event => event.toBattlefieldInternalEvent()));
    await this.eventBus.publish(events);
    return success();
  }
}
