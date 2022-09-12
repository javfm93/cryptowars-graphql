import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../Controller';
import { CommandBus } from '../../../../../Contexts/Shared/Domain/CommandBus';
import { SelectWorldCommand } from '../../../../../Contexts/CryptoWars/Players/Application/SelectWorld/SelectWorldCommand';
import { SelectWorldRequest } from './SelectWorldRequest';
import { SelectWorldCommandResult } from '../../../../../Contexts/CryptoWars/Players/Application/SelectWorld/SelectWorldCommandHandler';

export class SelectWorldPutController implements Controller {
  constructor(private commandBus: CommandBus) {}
  async run(req: Request<{}, void, SelectWorldRequest>, res: Response<void>) {
    const userId = req.user!.id;
    const selectWorldCommand = new SelectWorldCommand({ worldId: req.body.worldId, userId });
    const result: SelectWorldCommandResult = await this.commandBus.dispatch(selectWorldCommand);
    if (result.isSuccess()) {
      res.status(httpStatus.OK).send();
    } else {
      console.log(result.value);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
    }
  }
}
