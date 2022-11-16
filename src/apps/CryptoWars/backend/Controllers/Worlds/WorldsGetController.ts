import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../Controller';
import { QueryBus } from '../../../../../Contexts/Shared/Domain/QueryBus';
import { ListWorldsQuery } from '../../../../../Contexts/CryptoWars/Worlds/Application/List/ListWorldsQuery';
import { ListWorldsQueryResult } from '../../../../../Contexts/CryptoWars/Worlds/Application/List/ListWorldsQueryHandler';
import { WorldsResponse } from './WorldsResponse';

export class WorldsGetController implements Controller {
  constructor(private queryBus: QueryBus) {}

  async run(req: Request, res: Response<WorldsResponse>) {
    const listWorldsQuery = new ListWorldsQuery();
    const result = await this.queryBus.ask<ListWorldsQueryResult>(listWorldsQuery);

    if (result.isSuccess()) {
      res.status(httpStatus.OK).json({ worlds: result.value.toPrimitives() });
    } else {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
    }
  }
}
