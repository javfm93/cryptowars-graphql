import { CommandHandler } from '../../../../Shared/Domain/CommandHandler';
import { CreateUserCommand } from './CreateUserCommand';
import { CreateUser } from './CreateUser';
import { Command } from '../../../../Shared/Domain/Command';
import { UserId } from '../../Domain/UserId';
import { UserEmail } from '../../Domain/UserEmail';
import { UserPassword } from '../../Domain/UserPassword';

export class CreateUserCommandHandler implements CommandHandler<CreateUserCommand> {
  constructor(private createUser: CreateUser) {}

  subscribedTo(): Command {
    return CreateUserCommand;
  }

  async handle(command: CreateUserCommand): Promise<void> {
    const id = UserId.create(command.id);
    const email = UserEmail.create(command.email);
    const password = UserPassword.create(command.password);
    await this.createUser.execute({ id, email, password });
  }
}
