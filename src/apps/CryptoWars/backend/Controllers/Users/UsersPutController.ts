import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { CreateUserRequest } from './CreateUserRequest';
import { Controller } from '../Controller';
import { CommandBus } from '../../../../../Contexts/Shared/Domain/CommandBus';
import { CreateUserCommand } from '../../../../../Contexts/IAM/Users/Application/Create/CreateUserCommand';
import { InvalidEmailError } from '../../../../../Contexts/IAM/Users/Domain/Errors/InvalidEmailError';
import {
  CreateUserCommandErrors,
  CreateUserCommandResult
} from '../../../../../Contexts/IAM/Users/Application/Create/CreateUserCommandHandler';
import { InvalidPasswordError } from '../../../../../Contexts/IAM/Users/Domain/Errors/InvalidPasswordError';
import { UserAlreadyTakenError } from '../../../../../Contexts/IAM/Users/Application/Create/UserAlreadyTakenError';

type QueryParams = {
  id: string;
};

export class UsersPutController implements Controller {
  constructor(private commandBus: CommandBus) {}

  async run(req: Request<QueryParams, void, CreateUserRequest>, res: Response<void>) {
    const id: string = req.params.id;
    const email: string = req.body.email;
    const password: string = req.body.password;

    const createUserCommand = new CreateUserCommand({ id, email, password });
    const result: CreateUserCommandResult = await this.commandBus.dispatch(createUserCommand);

    result.isSuccess() ? res.status(httpStatus.OK).send() : this.handleError(res, result.value);
  }

  private handleError(res: Response, error: CreateUserCommandErrors) {
    if (error.isEqualTo(InvalidEmailError)) {
      res.status(httpStatus.BAD_REQUEST).send(error.message);
    }
    if (error.isEqualTo(InvalidPasswordError)) {
      res.status(httpStatus.BAD_REQUEST).send(error.message);
    }
    if (error.isEqualTo(UserAlreadyTakenError)) {
      res.status(httpStatus.CONFLICT).send(error.message);
    }
  }
}
