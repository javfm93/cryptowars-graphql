import { Command } from '../../Domain/Command';
import { CommandBus } from '../../Domain/CommandBus';
import { CommandHandlersInformation } from './CommandHandlersInformation';
import { CommandResult } from '../../Aplication/Result';
import { DomainError } from '../../Domain/Errors/DomainError';
import { logger } from '../WinstonLogger';
import { Service } from 'diod';

@Service()
export class InMemoryCommandBus implements CommandBus {
  constructor(private commandHandlersInformation: CommandHandlersInformation) {}

  dispatch<E extends DomainError>(command: Command): Promise<CommandResult<E>> {
    const handler = this.commandHandlersInformation.search(command);

    if (command.commandName !== 'ExecuteTasksPreviousTo')
      logger.debug(`dispatching command: ${JSON.stringify(command)}`);
    return handler.handle(command) as Promise<CommandResult<E>>;
  }
}
