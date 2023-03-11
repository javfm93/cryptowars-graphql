import { CommandHandler, RegisterCommandHandler } from '../../../../Shared/Domain/CommandHandler';
import { ExecuteTasksPreviousToCommand } from './ExecuteTasksPreviousToCommand';
import { ExecuteTasksPreviousTo } from './ExecuteTasksPreviousTo';
import { CommandClass } from '../../../../Shared/Domain/Command';
import { Either, EmptyResult, failure, success } from '../../../../Shared/Aplication/Result';
import { DomainError } from '../../../../Shared/Domain/Errors/DomainError';

export type SendAttackCommandResult = Either<EmptyResult, DomainError>;

@RegisterCommandHandler()
export class ExecuteTasksPreviousToCommandHandler
  implements CommandHandler<ExecuteTasksPreviousToCommand>
{
  constructor(private executeTasksPreviousTo: ExecuteTasksPreviousTo) {}

  subscribedTo(): CommandClass {
    return ExecuteTasksPreviousToCommand;
  }

  async handle(command: ExecuteTasksPreviousToCommand): Promise<SendAttackCommandResult> {
    const sendAttack = await this.executeTasksPreviousTo.execute(command.timestamp);
    return sendAttack.isSuccess() ? success() : failure(sendAttack.value);
  }
}
