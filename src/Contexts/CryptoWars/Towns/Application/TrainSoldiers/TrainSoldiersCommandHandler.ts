import { TrainSoldiersCommand } from './TrainSoldiersCommand';
import { TrainSoldiers } from './TrainSoldiers';
import { Either, EmptyResult, failure, success } from '../../../../Shared/Aplication/Result';
import { InvalidSoldier } from '../../Domain/InvalidSoldier';
import { InvalidNumberOfSoldiers } from '../../Domain/InvalidNumberOfSoldiers';
import { TownNotFound } from './TownNotFound';
import { CommandHandler } from '../../../../Shared/Domain/CommandHandler';
import { CommandClass } from '../../../../Shared/Domain/Command';
import { TownId } from '../../Domain/TownId';
import { TownSoldiers } from '../../Domain/TownSoldiers';
import { Forbidden } from '../../../../Shared/Domain/Errors/Forbidden';
import { PlayerId } from '../../../Players/Domain/PlayerId';
import { logger } from '../../../../Shared/Infrastructure/WinstonLogger';

export type TrainSoldiersCommandErrors =
  | InvalidSoldier
  | InvalidNumberOfSoldiers
  | TownNotFound
  | Forbidden;
export type TrainSoldiersCommandResult = Either<EmptyResult, TrainSoldiersCommandErrors>;

export class TrainSoldiersCommandHandler implements CommandHandler<TrainSoldiersCommand> {
  constructor(private trainSoldiers: TrainSoldiers) {}

  subscribedTo(): CommandClass {
    return TrainSoldiersCommand;
  }

  async handle(command: TrainSoldiersCommand): Promise<TrainSoldiersCommandResult> {
    const playerId = PlayerId.create(command.playerId);
    const townId = TownId.create(command.townId);
    const soldiersCreation = TownSoldiers.create(command.soldiers);
    if (soldiersCreation.isFailure()) return failure(soldiersCreation.value);
    const soldiers = soldiersCreation.value;
    logger.debug(`Command to train ${command.soldiers.basic} basic soldiers`);
    const trainSoldiers = await this.trainSoldiers.execute({ playerId, townId, soldiers });
    return trainSoldiers.isSuccess() ? success() : failure(trainSoldiers.value);
  }
}
