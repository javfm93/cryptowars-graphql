import { Command } from '../../../../Shared/Domain/Command';

type Params = {
  id: string;
  email: string;
  password: string;
};

export class CreateUserCommand extends Command {
  static COMMAND_NAME = 'CreateUser';

  id: string;
  email: string;
  password: string;

  constructor({ id, email, password }: Params) {
    super(CreateUserCommand.COMMAND_NAME);
    this.id = id;
    this.email = email;
    this.password = password;
  }
}
