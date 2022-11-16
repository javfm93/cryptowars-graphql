import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../Controller';
import { QueryBus } from '../../../../../Contexts/Shared/Domain/QueryBus';
import { WorldResponse } from './WorldResponse';
import { FindWorldQueryResult } from '../../../../../Contexts/CryptoWars/Worlds/Application/Find/FindWorldQueryHandler';
import { FindWorldQuery } from '../../../../../Contexts/CryptoWars/Worlds/Application/Find/FindWorldQuery';
import { WorldNotFound } from '../../../../../Contexts/CryptoWars/Worlds/Application/Find/WorldNotFound';

export class WorldGetController implements Controller {
  constructor(private queryBus: QueryBus) {}

  async run(req: Request<{ id: string }>, res: Response<WorldResponse | string>) {
    const findWorldQuery = new FindWorldQuery({ id: req.params.id });
    const result = await this.queryBus.ask<FindWorldQueryResult>(findWorldQuery);

    if (result.isSuccess()) {
      res.status(httpStatus.OK).json({ world: result.value.toMap() });
    } else {
      if (result.value.isEqualTo(WorldNotFound)) {
        res.status(httpStatus.NOT_FOUND).send(result.value.message);
      }
    }
  }
}
