import { BaseUseCase, UseCase } from '../../../../Shared/Domain/BaseUseCase';
import { Result, failure, successAndReturn } from '../../../../Shared/Aplication/Result';
import { Battles } from '../../Domain/Battles';
import { BattlefieldInternalEventRepository } from '../../../Shared/Domain/BattlefieldInternalEventRepository';
import { ArmyId } from '../../../Armies/Domain/ArmyId';
import { PlayerId } from '../../../../CryptoWars/Players/Domain/PlayerId';
import { ArmyNotFound } from '../../../Armies/Application/Find/ArmyNotFound';
import { Forbidden } from '../../../../Shared/Domain/Errors/Forbidden';

export type ListBattlesByArmyIdErrors = Forbidden | ArmyNotFound;
type ListBattlesResult = Result<Battles, ListBattlesByArmyIdErrors>;

type ListBattlesByArmyIdArgs = {
  armyId: ArmyId;
  playerId: PlayerId;
};

@UseCase()
export class ListBattlesByArmyId implements BaseUseCase<ListBattlesByArmyIdArgs, Battles> {
  constructor(private repository: BattlefieldInternalEventRepository) {}

  async execute({ armyId, playerId }: ListBattlesByArmyIdArgs): Promise<ListBattlesResult> {
    const army = await this.repository.materializeArmyByArmyId(armyId);
    if (!army) return failure(new ArmyNotFound());
    if (!army.isCommandedBy(playerId)) return failure(new Forbidden());
    const battles = await this.repository.materializeBattlesByArmyId(armyId);
    return successAndReturn(battles);
  }
}
