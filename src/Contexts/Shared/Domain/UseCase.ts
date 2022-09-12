import { Either } from '../Aplication/Result';
import { DomainError } from './Errors/DomainError';

export interface UseCase<Arguments, ReturnType> {
  execute(
    args: Arguments
  ): Either<ReturnType, DomainError> | Promise<Either<ReturnType, DomainError>>;
}
