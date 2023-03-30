import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller, RegisterController } from '../../Controller';
import { QueryBus } from '../../../../../../Contexts/Shared/Domain/QueryBus';
import { ArmyResponse } from './ArmyResponse';
import { FindArmyByTownQuery } from '../../../../../../Contexts/Battlefield/Armies/Application/Find/FindArmyByTownQuery';
import { FindArmyByTownQueryResult } from '../../../../../../Contexts/Battlefield/Armies/Application/Find/FindArmyByTownQueryHandler';
import { FindArmyErrors } from '../../../../../../Contexts/Battlefield/Armies/Application/Find/FindArmyByTown';
import { assertNeverHappen } from '../../../../../../Contexts/Shared/Domain/Primitives';

@RegisterController()
export class ArmyGetController implements Controller {
  constructor(private queryBus: QueryBus) {}

  async run(req: Request<{}, ArmyResponse, {}, { townId: string }>, res: Response<ArmyResponse>) {
    const playerId = req.user!.playerId;
    const townId = req.query.townId;
    const armyQuery = new FindArmyByTownQuery({ townId, playerId });
    const result = await this.queryBus.ask<FindArmyByTownQueryResult>(armyQuery);

    if (result.isSuccess()) {
      res.status(httpStatus.OK).json({ army: result.value.toPrimitives() });
    } else {
      console.error(result.value);
      this.handleError(res, result.value);
    }
  }

  private handleError(res: Response, error: FindArmyErrors) {
    const errorName = error.errorName();
    switch (errorName) {
      case 'ArmyNotFound':
        return res.status(httpStatus.NOT_FOUND).send(error.message);
      case 'Forbidden':
        return res.status(httpStatus.FORBIDDEN).send();
      default:
        assertNeverHappen(errorName);
    }
  }
}
