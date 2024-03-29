import { TrainSoldiersCommand } from './TrainSoldiersCommand';
import { TrainSoldiers, TrainSoldiersErrors } from './TrainSoldiers';
import { Result, Nothing, failure, success } from '../../../../Shared/Aplication/Result';
import { InvalidSoldier } from '../../Domain/InvalidSoldier';
import { InvalidNumberOfSoldiers } from '../../Domain/InvalidNumberOfSoldiers';
import { CommandHandler, RegisterCommandHandler } from '../../../../Shared/Domain/CommandHandler';
import { CommandClass } from '../../../../Shared/Domain/Command';
import { TownId } from '../../Domain/TownId';
import { TownSoldiers } from '../../Domain/TownSoldiers';
import { PlayerId } from '../../../Players/Domain/PlayerId';
import { logger } from '../../../../Shared/Infrastructure/WinstonLogger';

export type TrainSoldiersCommandErrors =
  | InvalidSoldier
  | InvalidNumberOfSoldiers
  | TrainSoldiersErrors;
export type TrainSoldiersCommandResult = Result<Nothing, TrainSoldiersCommandErrors>;

@RegisterCommandHandler()
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
