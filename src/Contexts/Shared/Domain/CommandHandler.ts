import { Command, CommandClass } from './Command';
import { CommandResult } from '../Aplication/Result';
import { Class } from './Primitives';
import { DomainError } from './Errors/DomainError';

export interface CommandHandler<T extends Command> {
  subscribedTo(): CommandClass;

  handle(command: T): Promise<CommandResult<DomainError>>;
}

export const registeredCommandHandlers: Class<any>[] = [];

export const RegisterCommandHandler = () => {
  return (target: Class<any>): Class<any> => {
    registeredCommandHandlers.push(target);

    return target;
  };
};
