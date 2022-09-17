import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../Controller';
import { QueryBus } from '../../../../../Contexts/Shared/Domain/QueryBus';
import { PlayerResponse } from './PlayerResponse';
import { FindPlayerQuery } from '../../../../../Contexts/CryptoWars/Players/Application/Find/FindPlayerQuery';
import { FindPlayerQueryResult } from '../../../../../Contexts/CryptoWars/Players/Application/Find/FindPlayerQueryHandler';

export class PlayerGetController implements Controller {
  constructor(private queryBus: QueryBus) {}
  async run(req: Request, res: Response<PlayerResponse>) {
    const userId = req.user!.id;
    const playerQuery = new FindPlayerQuery({ userId });
    const result = await this.queryBus.ask<FindPlayerQueryResult>(playerQuery);

    if (result.isSuccess()) {
      res.status(httpStatus.OK).json({ player: result.value.toPrimitives() });
    } else {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
    }
  }
}
