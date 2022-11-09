import { UseCase } from '../../../../Shared/Domain/UseCase';
import { Either, failure, successAndReturn } from '../../../../Shared/Aplication/Result';
import { Army } from '../../Domain/Army';
import { DomainError } from '../../../../Shared/Domain/Errors/DomainError';
import { ArmyNotFound } from './ArmyNotFound';
import { TownId } from '../../../../CryptoWars/Towns/domain/TownId';
import { PlayerId } from '../../../../CryptoWars/Players/Domain/PlayerId';
import { Forbidden } from '../../../../Shared/Domain/Errors/Forbidden';
import { BattlefieldInternalEventRepository } from '../../../Shared/Domain/BattlefieldInternalEventRepository';

type FindArmyResult = Either<Army, DomainError>;

type FindArmyArgs = {
  playerId: PlayerId;
  townId: TownId;
};

export class FindArmyByTown implements UseCase<FindArmyArgs, Army> {
  constructor(private eventRepository: BattlefieldInternalEventRepository) {}

  async execute({ playerId, townId }: FindArmyArgs): Promise<FindArmyResult> {
    const army = await this.eventRepository.materializeArmyByTownId(townId);
    if (!army) return failure(new ArmyNotFound());
    return army.isCommandedBy(playerId) ? successAndReturn(army) : failure(new Forbidden());
  }
}
