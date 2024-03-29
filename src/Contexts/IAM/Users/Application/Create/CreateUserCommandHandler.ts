import { CommandHandler, RegisterCommandHandler } from '../../../../Shared/Domain/CommandHandler';
import { CreateUserCommand } from './CreateUserCommand';
import { CommandClass } from '../../../../Shared/Domain/Command';
import { UserEmail } from '../../Domain/UserEmail';
import { UserPassword } from '../../Domain/UserPassword';
import { Result, Nothing, failure, success } from '../../../../Shared/Aplication/Result';
import { InvalidEmailError } from '../../Domain/Errors/InvalidEmailError';
import { InvalidPasswordError } from '../../Domain/Errors/InvalidPasswordError';
import { CreateUser, CreateUserErrors } from './CreateUser';
import { UserId } from '../../Domain/UserId';
import { UserName } from '../../Domain/UserName';
import { InvalidNameError } from '../../Domain/Errors/InvalidNameError';

export type CreateUserCommandErrors =
  | InvalidEmailError
  | InvalidPasswordError
  | InvalidNameError
  | CreateUserErrors;
export type CreateUserCommandResult = Result<Nothing, CreateUserCommandErrors>;

@RegisterCommandHandler()
export class CreateUserCommandHandler implements CommandHandler<CreateUserCommand> {
  constructor(private createUser: CreateUser) {}

  subscribedTo(): CommandClass {
    return CreateUserCommand;
  }

  async handle(command: CreateUserCommand): Promise<CreateUserCommandResult> {
    const id = UserId.create(command.id);
    const emailCreation = UserEmail.create(command.email);
    const passwordCreation = UserPassword.create(command.password);
    const nameCreation = UserName.create(command.name);

    if (emailCreation.isFailure()) return failure(emailCreation.value);
    if (passwordCreation.isFailure()) return failure(passwordCreation.value);
    if (nameCreation.isFailure()) return failure(nameCreation.value);

    const email = emailCreation.value;
    const password = passwordCreation.value;
    const name = nameCreation.value;
    const userCreation = await this.createUser.execute({ id, email, password, name });

    return userCreation.isSuccess() ? success() : failure(userCreation.value);
  }
}
