import { CommandHandler, RegisterCommandHandler } from '../../../../Shared/Domain/CommandHandler';
import { SendAttackCommand } from './SendAttackCommand';
import { SendAttack, SendAttackErrors } from './SendAttack';
import { CommandClass } from '../../../../Shared/Domain/Command';
import { AttackId } from '../../Domain/AttackId';
import { Result, Nothing, failure, success } from '../../../../Shared/Aplication/Result';
import { TownId } from '../../../../CryptoWars/Towns/Domain/TownId';
import { AttackTroop } from '../../Domain/AttackTroop';
import { PlayerId } from '../../../../CryptoWars/Players/Domain/PlayerId';
import { InvalidSquad } from '../../../Armies/Domain/InvalidSquad';

export type SendAttackCommandErrors = InvalidSquad | SendAttackErrors;
export type SendAttackCommandResult = Result<Nothing, SendAttackCommandErrors>;

@RegisterCommandHandler()
export class SendAttackCommandHandler implements CommandHandler<SendAttackCommand> {
  constructor(private sendAttack: SendAttack) {}

  subscribedTo(): CommandClass {
    return SendAttackCommand;
  }

  async handle(command: SendAttackCommand): Promise<SendAttackCommandResult> {
    const id = AttackId.create(command.id);
    const playerId = PlayerId.create(command.playerId);
    const attackerTroop = AttackTroop.create(command.attackerArmy, command.soldiers);
    if (attackerTroop.isFailure()) return failure(attackerTroop.value);
    const defenderTownId = TownId.create(command.defenderTown);
    const args = { id, attackerTroop: attackerTroop.value, defenderTownId, playerId };
    const sendAttack = await this.sendAttack.execute(args);
    return sendAttack.isSuccess() ? success() : failure(sendAttack.value);
  }
}
