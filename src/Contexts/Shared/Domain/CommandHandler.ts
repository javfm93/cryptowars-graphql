import { Command, CommandClass } from './Command';
import { Either, Result } from '../Aplication/Result';
import { DomainError } from './Errors/DomainError';
import { Class } from './Primitives';

export interface CommandHandler<T extends Command> {
  subscribedTo(): CommandClass;

  handle(command: T): Promise<Either<Result<void>, DomainError>>;
}

export const registeredCommandHandlers: Class<any>[] = [];

export const RegisterCommandHandler = () => {
  return (target: Class<any>): Class<any> => {
    registeredCommandHandlers.push(target);

    return target;
  };
};
