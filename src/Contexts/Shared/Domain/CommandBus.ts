import { Command } from './Command';
import { Either, Result } from '../Aplication/Result';
import { DomainError } from './Errors/DomainError';

export interface CommandBus {
  dispatch(command: Command): Promise<Either<Result<void>, DomainError>>;
}
