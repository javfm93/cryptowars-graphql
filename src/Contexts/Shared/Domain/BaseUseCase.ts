import { Result } from '../Aplication/Result';
import { DomainError } from './Errors/DomainError';
import { Class } from './Primitives';

export interface BaseUseCase<Arguments, ReturnType> {
  execute(
    args: Arguments
  ): Result<ReturnType, DomainError> | Promise<Result<ReturnType, DomainError>>;
}

export const registeredUseCases: Class<any>[] = [];

export const UseCase = () => {
  return (target: Class<any>): Class<any> => {
    registeredUseCases.push(target);

    return target;
  };
};
