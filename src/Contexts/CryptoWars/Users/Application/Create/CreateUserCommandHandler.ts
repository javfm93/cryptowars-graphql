import { CommandHandler } from '../../../../Shared/Domain/CommandHandler';
import { CreateUserCommand } from './CreateUserCommand';
import { CreateUser } from './CreateUser';
import { Command } from '../../../../Shared/Domain/Command';
import { UserId } from '../../Domain/UserId';
import { UserEmail } from '../../Domain/UserEmail';
import { UserPassword } from '../../Domain/UserPassword';
import { Either, failure, Result, success } from '../../../../Shared/Aplication/Result';
import { InvalidEmailError } from '../../Domain/Errors/InvalidEmailError';
import { InvalidPasswordError } from '../../Domain/Errors/InvalidPasswordError';

export type CreateUserResult = Either<Result<void>, InvalidEmailError | InvalidPasswordError>;

export class CreateUserCommandHandler implements CommandHandler<CreateUserCommand> {
  constructor(private createUser: CreateUser) {}

  subscribedTo(): Command {
    return CreateUserCommand;
  }

  async handle(command: CreateUserCommand): Promise<CreateUserResult> {
    const id = UserId.create(command.id);
    const emailCreation = UserEmail.create(command.email);
    const passwordCreation = UserPassword.create(command.password);

    if (emailCreation.isFailure()) return failure(emailCreation.value);
    if (passwordCreation.isFailure()) return failure(passwordCreation.value);

    const email = emailCreation.value;
    const password = passwordCreation.value;
    await this.createUser.execute({ id, email, password });
    return success(Result.ok());
  }
}
