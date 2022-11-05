import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../Controller';
import { QueryBus } from '../../../../../Contexts/Shared/Domain/QueryBus';
import { ArmyResponse } from './ArmyResponse';
import { FindArmyByTownQuery } from '../../../../../Contexts/Battlefield/Armies/Application/Find/FindArmyByTownQuery';
import { FindArmyQueryResult } from '../../../../../Contexts/Battlefield/Armies/Application/Find/FindArmyByTownQueryHandler';

export class ArmyGetController implements Controller {
  constructor(private queryBus: QueryBus) {}

  async run(req: Request<{}, ArmyResponse, {}, { townId: string }>, res: Response<ArmyResponse>) {
    const playerId = req.user!.playerId;
    const townId = req.query.townId;
    const armyQuery = new FindArmyByTownQuery({ townId, playerId });
    const result = await this.queryBus.ask<FindArmyQueryResult>(armyQuery);

    if (result.isSuccess()) {
      res.status(httpStatus.OK).json({ army: result.value.toPrimitives() });
    } else {
      console.error(result.value);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
    }
  }
}
