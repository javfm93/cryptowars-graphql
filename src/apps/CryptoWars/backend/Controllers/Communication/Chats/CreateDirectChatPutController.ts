import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../../Controller';
import { CommandBus } from '../../../../../../Contexts/Shared/Domain/CommandBus';
import { CreateDirectChatRequest } from './CreateDirectChatRequest';
import { CreateDirectChatCommand } from '../../../../../../Contexts/Communication/Chats/Application/Create/CreateDirectChatCommand';
import { CreateDirectChatCommandResult } from '../../../../../../Contexts/Communication/Chats/Application/Create/CreateDirectChatCommandHandler';

type QueryParams = {
  id: string;
};

export class CreateDirectChatPutController implements Controller {
  constructor(private commandBus: CommandBus) {}

  async run(req: Request<QueryParams, void, CreateDirectChatRequest>, res: Response<void>) {
    const id = req.params.id;
    const playerId = req.user!.playerId;
    const playerTwo = req.body.playerTwoId;
    const createChatCommand = new CreateDirectChatCommand(id, playerId, playerTwo);

    const result: CreateDirectChatCommandResult = await this.commandBus.dispatch(createChatCommand);
    if (result.isSuccess()) {
      res.status(httpStatus.OK).send();
    } else {
      console.log(result.value);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
    }
  }
}
