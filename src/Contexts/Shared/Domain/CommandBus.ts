import { Command } from './Command';
import { Either, Result } from '../Aplication/Result';
import { DomainError } from './Errors/DomainError';

export abstract class CommandBus {
  abstract dispatch(command: Command): Promise<Either<Result<void>, DomainError>>;
}
