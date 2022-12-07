import { Command } from '../../Domain/Command';
import { CommandBus } from '../../Domain/CommandBus';
import { CommandHandlersInformation } from './CommandHandlersInformation';
import { Either, Result } from '../../Aplication/Result';
import { DomainError } from '../../Domain/Errors/DomainError';
import { logger } from '../WinstonLogger';

export class InMemoryCommandBus implements CommandBus {
  constructor(private commandHandlersInformation: CommandHandlersInformation) {}

  dispatch(command: Command): Promise<Either<Result<void>, DomainError>> {
    const handler = this.commandHandlersInformation.search(command);

    if (command.commandName !== 'ExecuteTasksPreviousTo')
      logger.debug(`dispatching command: ${JSON.stringify(command)}`);
    return handler.handle(command);
  }
}
