import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { TrainSoldiersPostRequest } from './TrainSoldiersPostRequest';
import { Controller } from '../../Controller';
import { CommandBus } from '../../../../../../Contexts/Shared/Domain/CommandBus';
import { TrainSoldiersCommand } from '../../../../../../Contexts/CryptoWars/Towns/Application/TrainSoldiers/TrainSoldiersCommand';
import {
  TrainSoldiersCommandErrors,
  TrainSoldiersCommandResult
} from '../../../../../../Contexts/CryptoWars/Towns/Application/TrainSoldiers/TrainSoldiersCommandHandler';
import { InvalidSoldier } from '../../../../../../Contexts/CryptoWars/Towns/Domain/InvalidSoldier';
import { InvalidNumberOfSoldiers } from '../../../../../../Contexts/CryptoWars/Towns/Domain/InvalidNumberOfSoldiers';
import { TownNotFound } from '../../../../../../Contexts/CryptoWars/Towns/Application/TrainSoldiers/TownNotFound';
import { Forbidden } from '../../../../../../Contexts/Shared/Domain/Errors/Forbidden';
import { logger } from '../../../../../../Contexts/Shared/Infrastructure/WinstonLogger';

type RequestParams = {
  id: string;
};

export class TrainSoldiersPostController implements Controller {
  constructor(private commandBus: CommandBus) {}

  async run(req: Request<RequestParams, void, TrainSoldiersPostRequest>, res: Response<void>) {
    const { id } = req.params;
    const { soldiers } = req.body;
    const playerId = req.user!.playerId;

    const trainSoldiersCommand = new TrainSoldiersCommand({ playerId, townId: id, soldiers });
    const result: TrainSoldiersCommandResult = await this.commandBus.dispatch(trainSoldiersCommand);

    result.isSuccess() ? res.status(httpStatus.OK).send() : this.handleError(res, result.value);
  }

  private handleError(res: Response, error: TrainSoldiersCommandErrors) {
    logger.error(error.stack);
    if (error.isEqualTo(InvalidSoldier) || error.isEqualTo(InvalidNumberOfSoldiers)) {
      res.status(httpStatus.BAD_REQUEST).send(error.message);
    }
    if (error.isEqualTo(TownNotFound)) {
      res.status(httpStatus.NOT_FOUND).send(error.message);
    }
    if (error.isEqualTo(Forbidden)) {
      res.status(httpStatus.FORBIDDEN).send();
    }
  }
}
