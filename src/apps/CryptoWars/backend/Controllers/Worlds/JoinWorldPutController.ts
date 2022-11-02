import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../Controller';
import { CommandBus } from '../../../../../Contexts/Shared/Domain/CommandBus';
import { JoinWorldCommand } from '../../../../../Contexts/CryptoWars/Worlds/Application/Join/JoinWorldCommand';
import { JoinWorldCommandResult } from '../../../../../Contexts/CryptoWars/Worlds/Application/Join/JoinWorldCommandHandler';

type QueryParams = {
  id: string;
};

export class JoinWorldPutController implements Controller {
  constructor(private commandBus: CommandBus) {}

  async run(req: Request<QueryParams, void, {}>, res: Response<void>) {
    const userId = req.user!.id;
    const joinWorldCommand = new JoinWorldCommand({ worldId: req.params.id, userId });
    const result: JoinWorldCommandResult = await this.commandBus.dispatch(joinWorldCommand);
    if (result.isSuccess()) {
      res.status(httpStatus.OK).send();
    } else {
      console.log(result.value);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
    }
  }
}
