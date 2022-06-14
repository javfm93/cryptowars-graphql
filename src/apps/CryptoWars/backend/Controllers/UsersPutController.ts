import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from './Controller';
import { CommandBus } from '../../../../Contexts/Shared/Domain/CommandBus';
import { CreateUserCommand } from '../../../../Contexts/CryptoWars/Users/Application/Create/CreateUserCommand';

type PutUserRequestParams = {
  id: string;
};

type PutUserRequestBody = {
  email: string;
  password: string;
};

export class UserPutController implements Controller {
  constructor(private commandBus: CommandBus) {}
  async run(req: Request<PutUserRequestParams, void, PutUserRequestBody>, res: Response<void>) {
    const id: string = req.params.id;
    const email: string = req.body.email;
    const password: string = req.body.password;

    const createUserCommand = new CreateUserCommand({ id, email, password });
    await this.commandBus.dispatch(createUserCommand);
    res.status(httpStatus.OK).send();
  }
}
