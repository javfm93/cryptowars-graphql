import { CommandHandler } from '../../../../Shared/Domain/CommandHandler';
import { CreateUserCommand } from './CreateUserCommand';
import { CreateUser } from './CreateUser';
import { Command } from '../../../../Shared/Domain/Command';
import { UserId } from '../../Domain/UserId';
import { UserEmail } from '../../Domain/UserEmail';
import { UserPassword } from '../../Domain/UserPassword';
import { Either, EmptyResult, failure, success } from '../../../../Shared/Aplication/Result';
import { InvalidEmailError } from '../../Domain/Errors/InvalidEmailError';
import { InvalidPasswordError } from '../../Domain/Errors/InvalidPasswordError';
import { UserAlreadyTakenError } from './UserAlreadyTakenError';

export type CreateUserCommandErrors =
  | InvalidEmailError
  | InvalidPasswordError
  | UserAlreadyTakenError;
export type CreateUserCommandResult = Either<EmptyResult, CreateUserCommandErrors>;

export class CreateUserCommandHandler implements CommandHandler<CreateUserCommand> {
  constructor(private createUser: CreateUser) {}

  subscribedTo(): Command {
    return CreateUserCommand;
  }

  async handle(command: CreateUserCommand): Promise<CreateUserCommandResult> {
    const id = UserId.create(command.id);
    const emailCreation = UserEmail.create(command.email);
    const passwordCreation = UserPassword.create(command.password);

    if (emailCreation.isFailure()) return failure(emailCreation.value);
    if (passwordCreation.isFailure()) return failure(passwordCreation.value);

    const email = emailCreation.value;
    const password = passwordCreation.value;
    const userCreation = await this.createUser.execute({ id, email, password });

    return userCreation.isSuccess() ? success() : failure(userCreation.value);
  }
}
