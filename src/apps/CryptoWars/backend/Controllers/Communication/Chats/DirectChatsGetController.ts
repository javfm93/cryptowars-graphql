import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../../Controller';
import { QueryBus } from '../../../../../../Contexts/Shared/Domain/QueryBus';
import { DirectChatsResponse } from './DirectChatsResponse';
import { FindDirectChatsByPlayerIdQuery } from '../../../../../../Contexts/Communication/Chats/Application/Find/FindDirectChatsByPlayerIdQuery';
import { FindDirectChatsQueryResult } from '../../../../../../Contexts/Communication/Chats/Application/Find/FindDirectChatsByPlayerIdQueryHandler';

export class DirectChatsGetController implements Controller {
  constructor(private queryBus: QueryBus) {}

  async run(req: Request, res: Response<DirectChatsResponse>) {
    const playerId = req.user!.playerId;
    const findChats = new FindDirectChatsByPlayerIdQuery(playerId);
    const result: FindDirectChatsQueryResult = await this.queryBus.ask(findChats);
    if (result.isSuccess()) {
      res.status(httpStatus.OK).json({ chats: result.value.toPrimitives() });
    } else {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
    }
  }
}
