import { Either } from '../Aplication/Result';
import { DomainError } from './Errors/DomainError';
import { Class } from './Primitives';

export interface UseCase<Arguments, ReturnType> {
  execute(
    args: Arguments
  ): Either<ReturnType, DomainError> | Promise<Either<ReturnType, DomainError>>;
}

export const registeredUseCases: Class<any>[] = [];

export const RegisterUseCase = () => {
  return (target: Class<any>): Class<any> => {
    registeredUseCases.push(target);

    return target;
  };
};
