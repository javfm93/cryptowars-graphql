import { Command, CommandClass } from './Command';
import { Either, Result } from '../Aplication/Result';
import { DomainError } from './Errors/DomainError';

export interface CommandHandler<T extends Command> {
  subscribedTo(): CommandClass;

  handle(command: T): Promise<Either<Result<void>, DomainError>>;
}
