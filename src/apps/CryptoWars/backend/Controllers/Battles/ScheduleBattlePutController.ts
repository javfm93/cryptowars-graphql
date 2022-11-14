import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { ScheduleBattleRequest } from './ScheduleBattleRequest';
import { Controller } from '../Controller';
import { CommandBus } from '../../../../../Contexts/Shared/Domain/CommandBus';
import { Forbidden } from '../../../../../Contexts/Shared/Domain/Errors/Forbidden';
import { TownNotFound } from '../../../../../Contexts/CryptoWars/Towns/application/TrainSoldiers/TownNotFound';

type QueryParams = {
  id: string;
};

export class ScheduleBattlePutController implements Controller {
  constructor(private commandBus: CommandBus) {}

  async run(req: Request<QueryParams, void, ScheduleBattleRequest>, res: Response<void>) {
    const id: string = req.params.id;
    const playerId = req.user!.playerId;
    const { attackerArmy, defenderTown, troop } = req.body;

    const scheduleBattleCommand = new ScheduleBattleCommand({
      id,
      attackerArmy,
      defenderTown,
      troop,
      playerId
    });
    const result: ScheduleBattleCommandResult = await this.commandBus.dispatch(
      scheduleBattleCommand
    );

    result.isSuccess() ? res.status(httpStatus.OK).send() : this.handleError(res, result.value);
  }

  private handleError(res: Response, error: ScheduleBattleCommandErrors) {
    if (error.isEqualTo(TownNotFound)) return res.status(httpStatus.NOT_FOUND).send(error.message);

    if (error.isEqualTo(NotEnoughSoldiers))
      return res.status(httpStatus.BAD_REQUEST).send(error.message);

    if (error.isEqualTo(Forbidden)) return res.status(httpStatus.FORBIDDEN).send();
  }
}
