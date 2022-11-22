import { Request, Response } from 'express';
import httpStatus, { BAD_REQUEST, CONFLICT, FORBIDDEN, NOT_FOUND } from 'http-status';
import { SendAttackRequest } from './SendAttackRequest';
import { Controller } from '../Controller';
import { CommandBus } from '../../../../../Contexts/Shared/Domain/CommandBus';
import { Forbidden } from '../../../../../Contexts/Shared/Domain/Errors/Forbidden';
import { TownNotFound } from '../../../../../Contexts/CryptoWars/Towns/Application/TrainSoldiers/TownNotFound';
import { SendAttackCommand } from '../../../../../Contexts/Battlefield/Attacks/Application/Send/SendAttackCommand';
import {
  SendAttackCommandErrors,
  SendAttackCommandResult
} from '../../../../../Contexts/Battlefield/Attacks/Application/Send/SendAttackCommandHandler';
import { ArmyNotFound } from '../../../../../Contexts/Battlefield/Armies/Application/Find/ArmyNotFound';
import { InvalidSoldier } from '../../../../../Contexts/CryptoWars/Towns/Domain/InvalidSoldier';
import { AttackAlreadyExist } from '../../../../../Contexts/Battlefield/Attacks/Application/Send/AttackAlreadyExist';
import { InvalidNumberOfSoldiers } from '../../../../../Contexts/CryptoWars/Towns/Domain/InvalidNumberOfSoldiers';
import { logger } from '../../../../../Contexts/Shared/Infrastructure/WinstonLogger';

type QueryParams = {
  id: string;
};

export class SendAttackPutController implements Controller {
  constructor(private commandBus: CommandBus) {}

  async run(req: Request<QueryParams, void, SendAttackRequest>, res: Response<void>) {
    const id: string = req.params.id;
    const playerId = req.user!.playerId;
    const { attackerArmy, defenderTown, soldiers } = req.body;

    const scheduleBattleCommand = new SendAttackCommand({
      id,
      attackerArmy,
      defenderTown,
      soldiers,
      playerId
    });
    const result: SendAttackCommandResult = await this.commandBus.dispatch(scheduleBattleCommand);
    result.isSuccess() ? res.status(httpStatus.OK).send() : this.handleError(res, result.value);
  }

  private handleError(res: Response, error: SendAttackCommandErrors) {
    logger.error(error.stack);
    if (error.isEqualTo(TownNotFound)) return res.status(NOT_FOUND).send(error.message);
    if (error.isEqualTo(ArmyNotFound)) return res.status(NOT_FOUND).send(error.message);
    if (error.isEqualTo(Forbidden)) return res.status(FORBIDDEN).send();
    if (error.isEqualTo(AttackAlreadyExist)) return res.status(CONFLICT).send(error.message);
    if (error.isEqualTo(InvalidSoldier)) return res.status(BAD_REQUEST).send(error.message);
    if (error.isEqualTo(InvalidNumberOfSoldiers))
      return res.status(BAD_REQUEST).send(error.message);
  }
}
