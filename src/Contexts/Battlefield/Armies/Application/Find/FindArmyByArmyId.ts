import { UseCase } from '../../../../Shared/Domain/UseCase';
import { Either, failure, successAndReturn } from '../../../../Shared/Aplication/Result';
import { Army } from '../../Domain/Army';
import { ArmyNotFound } from './ArmyNotFound';
import { PlayerId } from '../../../../CryptoWars/Players/Domain/PlayerId';
import { Forbidden } from '../../../../Shared/Domain/Errors/Forbidden';
import { BattlefieldInternalEventRepository } from '../../../Shared/Domain/BattlefieldInternalEventRepository';
import { ArmyId } from '../../Domain/ArmyId';

export type FindArmyByArmyIdErrors = ArmyNotFound | Forbidden;
type FindArmyResult = Either<Army, FindArmyByArmyIdErrors>;

type FindArmyArgs = {
  playerId: PlayerId;
  armyId: ArmyId;
};

export class FindArmyByArmyId implements UseCase<FindArmyArgs, Army> {
  constructor(private eventRepository: BattlefieldInternalEventRepository) {}

  async execute({ playerId, armyId }: FindArmyArgs): Promise<FindArmyResult> {
    const army = await this.eventRepository.materializeArmyByArmyId(armyId);
    if (!army) return failure(new ArmyNotFound());
    return army.isCommandedBy(playerId) ? successAndReturn(army) : failure(new Forbidden());
  }
}
