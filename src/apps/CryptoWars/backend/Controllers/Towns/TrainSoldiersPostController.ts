import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { TrainSoldiersPostRequest } from './TrainSoldiersPostRequest';
import { Controller } from '../Controller';
import { CommandBus } from '../../../../../Contexts/Shared/Domain/CommandBus';
import { TrainSoldiersCommand } from '../../../../../Contexts/CryptoWars/Towns/application/TrainSoldiersCommand';
import {
  TrainSoldiersCommandErrors,
  TrainSoldiersCommandResult
} from '../../../../../Contexts/CryptoWars/Towns/application/TrainSoldiersCommandHandler';
import { InvalidSoldier } from '../../../../../Contexts/CryptoWars/Towns/domain/InvalidSoldier';
import { InvalidNumberOfSoldiers } from '../../../../../Contexts/CryptoWars/Towns/domain/InvalidNumberOfSoldiers';
import { TownNotFound } from '../../../../../Contexts/CryptoWars/Towns/application/TownNotFound';
import { Forbidden } from '../../../../../Contexts/CryptoWars/Shared/Domain/Forbidden';

type RequestParams = {
  id: string;
};

export class TrainSoldiersPostController implements Controller {
  constructor(private commandBus: CommandBus) {}

  async run(req: Request<RequestParams, void, TrainSoldiersPostRequest>, res: Response<void>) {
    const { id } = req.params;
    const { soldiers } = req.body;
    const userId = req.user!.id;

    const trainSoldiersCommand = new TrainSoldiersCommand({ userId, townId: id, soldiers });
    const result: TrainSoldiersCommandResult = await this.commandBus.dispatch(trainSoldiersCommand);

    result.isSuccess() ? res.status(httpStatus.OK).send() : this.handleError(res, result.value);
  }

  private handleError(res: Response, error: TrainSoldiersCommandErrors) {
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
