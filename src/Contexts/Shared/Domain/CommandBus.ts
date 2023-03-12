import { Command } from './Command';
import { DomainError } from './Errors/DomainError';
import { CommandResult } from '../Aplication/Result';

export abstract class CommandBus {
  abstract dispatch<E extends DomainError>(command: Command): Promise<CommandResult<E>>;
}
