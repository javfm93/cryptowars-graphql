import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../Controller';
import { QueryBus } from '../../../../../Contexts/Shared/Domain/QueryBus';
import { ListWorldsQuery } from '../../../../../Contexts/CryptoWars/Worlds/Application/List/ListWorldsQuery';
import { ListWorldsQueryResult } from '../../../../../Contexts/CryptoWars/Worlds/Application/List/ListWorldsQueryHandler';
import { ListWorldsResponse } from './ListWorldsResponse';
import { CommandBus } from '../../../../../Contexts/Shared/Domain/CommandBus';

export class AddPlayerToWorldPostController implements Controller {
  constructor(private commandBus: CommandBus) {}
  async run(req: Request, res: Response<void>) {
    const listWorldsQuery = new AddPlayerToWorldCommand();
    const result: ListWorldsQueryResult = await this.queryBus.ask(listWorldsQuery);

    if (result.isSuccess()) {
      const worlds = result.value.map(world => world.toPrimitives());
      res.status(httpStatus.OK).json({ worlds });
    } else {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
    }
  }
}
