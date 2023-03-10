import { Command } from '../../Domain/Command';
import { CommandBus } from '../../Domain/CommandBus';
import { Service } from 'diod';
import { CommandHandlers } from './CommandHandlers';
import { Either, Result } from '../../Aplication/Result';
import { DomainError } from '../../Domain/Errors/DomainError';
import { logger } from '../WinstonLogger';

@Service()
export class InMemoryCommandBus implements CommandBus {
  constructor(private commandHandlers: CommandHandlers) {}

  dispatch(command: Command): Promise<Either<Result<void>, DomainError>> {
    const handler = this.commandHandlers.search(command);

    if (command.commandName !== 'ExecuteTasksPreviousTo')
      logger.debug(`dispatching command: ${JSON.stringify(command)}`);
    return handler.handle(command);
  }
}
