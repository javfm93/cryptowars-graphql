import { RegisterUseCase, UseCase } from '../../../../Shared/Domain/UseCase';
import { Either, failure, successAndReturn } from '../../../../Shared/Aplication/Result';
import { DomainError } from '../../../../Shared/Domain/Errors/DomainError';
import { Battles } from '../../Domain/Battles';
import { BattlefieldInternalEventRepository } from '../../../Shared/Domain/BattlefieldInternalEventRepository';
import { ArmyId } from '../../../Armies/Domain/ArmyId';
import { PlayerId } from '../../../../CryptoWars/Players/Domain/PlayerId';
import { ArmyNotFound } from '../../../Armies/Application/Find/ArmyNotFound';
import { Forbidden } from '../../../../Shared/Domain/Errors/Forbidden';

type ListBattlesResult = Either<Battles, DomainError>;

type ListBattlesByArmyIdArgs = {
  armyId: ArmyId;
  playerId: PlayerId;
};

@RegisterUseCase()
export class ListBattlesByArmyId implements UseCase<ListBattlesByArmyIdArgs, Battles> {
  constructor(private repository: BattlefieldInternalEventRepository) {}

  async execute({ armyId, playerId }: ListBattlesByArmyIdArgs): Promise<ListBattlesResult> {
    const army = await this.repository.materializeArmyByArmyId(armyId);
    if (!army) return failure(new ArmyNotFound());
    if (!army.isCommandedBy(playerId)) return failure(new Forbidden());
    const battles = await this.repository.materializeBattlesByArmyId(armyId);
    return successAndReturn(battles);
  }
}
