import { CommandHandler } from '../../../../Shared/Domain/CommandHandler';
import { SendAttackCommand } from './SendAttackCommand';
import { SendAttack } from './SendAttack';
import { CommandClass } from '../../../../Shared/Domain/Command';
import { AttackId } from '../../Domain/AttackId';
import { Either, EmptyResult, failure, success } from '../../../../Shared/Aplication/Result';
import { TownId } from '../../../../CryptoWars/Towns/Domain/TownId';
import { AttackTroop } from '../../Domain/AttackTroop';
import { DomainError } from '../../../../Shared/Domain/Errors/DomainError';
import { PlayerId } from '../../../../CryptoWars/Players/Domain/PlayerId';

export type SendAttackCommandErrors = DomainError;
export type SendAttackCommandResult = Either<EmptyResult, SendAttackCommandErrors>;

export class SendAttackCommandHandler implements CommandHandler<SendAttackCommand> {
  constructor(private sendAttack: SendAttack) {}

  subscribedTo(): CommandClass {
    return SendAttackCommand;
  }

  async handle(command: SendAttackCommand): Promise<SendAttackCommandResult> {
    const id = AttackId.create(command.id);
    const playerId = PlayerId.create(command.playerId);
    const attackerTroop = AttackTroop.create(command.attackerArmy, command.soldiers);
    const defenderTownId = TownId.create(command.defenderTown);
    const args = { id, attackerTroop, defenderTownId, playerId };
    const sendAttack = await this.sendAttack.execute(args);
    return sendAttack.isSuccess() ? success() : failure(sendAttack.value);
  }
}
