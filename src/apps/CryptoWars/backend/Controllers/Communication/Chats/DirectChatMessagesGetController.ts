import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../../Controller';
import { QueryBus } from '../../../../../../Contexts/Shared/Domain/QueryBus';
import { DirectChatMessagesResponse } from './DirectChatMessagesResponse';
import { FindChatMessagesQuery } from '../../../../../../Contexts/Communication/ChatMessages/Application/Find/FindChatMessagesQuery';
import { FindDirectChatMessagesQueryResult } from '../../../../../../Contexts/Communication/ChatMessages/Application/Find/FindChatMessagesQueryHandler';
import { Forbidden } from '../../../../../../Contexts/Shared/Domain/Errors/Forbidden';

export class DirectChatMessagesGetController implements Controller {
  constructor(private queryBus: QueryBus) {}

  async run(req: Request<{ id: string }>, res: Response<DirectChatMessagesResponse | string>) {
    const chatId = req.params.id;
    const playerId = req.user!.playerId;
    const findMessagesQuery = new FindChatMessagesQuery(playerId, chatId);
    const result: FindDirectChatMessagesQueryResult = await this.queryBus.ask(findMessagesQuery);

    if (result.isSuccess()) {
      res.status(httpStatus.OK).json({ messages: result.value.toPrimitives() });
    } else {
      if (result.value.isEqualTo(Forbidden)) {
        res.status(httpStatus.FORBIDDEN).send();
      }
    }
  }
}
