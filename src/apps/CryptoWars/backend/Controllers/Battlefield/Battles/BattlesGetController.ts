import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller, RegisterController } from '../../Controller';
import { QueryBus } from '../../../../../../Contexts/Shared/Domain/QueryBus';
import { BattlesResponse } from './BattlesResponse';
import { ArmyNotFound } from '../../../../../../Contexts/Battlefield/Armies/Application/Find/ArmyNotFound';
import { Forbidden } from '../../../../../../Contexts/Shared/Domain/Errors/Forbidden';
import { ListBattlesByArmyIdQuery } from '../../../../../../Contexts/Battlefield/Battles/Application/List/ListBattlesByArmyIdQuery';
import { ListBattlesByArmyIdQueryResult } from '../../../../../../Contexts/Battlefield/Battles/Application/List/ListBattlesByArmyIdQueryHandler';

@RegisterController()
export class BattlesGetController implements Controller {
  constructor(private queryBus: QueryBus) {}

  async run(
    req: Request<{}, BattlesResponse, {}, { armyId: string }>,
    res: Response<BattlesResponse | string>
  ) {
    const playerId = req.user!.playerId;
    const listBattlesQuery = new ListBattlesByArmyIdQuery(req.query.armyId, playerId);
    const result = await this.queryBus.ask<ListBattlesByArmyIdQueryResult>(listBattlesQuery);

    if (result.isSuccess()) {
      res.status(httpStatus.OK).json({ battles: result.value.toPrimitives() });
    } else {
      if (result.value.isEqualTo(ArmyNotFound)) {
        res.status(httpStatus.NOT_FOUND).send(result.value.message);
      }
      if (result.value.isEqualTo(Forbidden)) {
        res.status(httpStatus.FORBIDDEN).send();
      }
    }
  }
}
