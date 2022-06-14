import { Command } from '../../../../Shared/Domain/Command';

type Params = {
  id: string;
  email: string;
  password: string;
};

export class CreateUserCommand extends Command {
  id: string;
  email: string;
  password: string;

  constructor({ id, email, password }: Params) {
    super();
    this.id = id;
    this.email = email;
    this.password = password;
  }
}
