import { Command } from '../../../../Shared/Domain/Command';

type Params = {
  id: string;
  email: string;
  password: string;
  name: string;
};

export class CreateUserCommand extends Command {
  static COMMAND_NAME = 'CreateUser';

  id: string;
  email: string;
  password: string;
  name: string;

  constructor({ id, email, password, name }: Params) {
    super(CreateUserCommand.COMMAND_NAME);
    this.id = id;
    this.email = email;
    this.password = password;
    this.name = name;
  }
}
