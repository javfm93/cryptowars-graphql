import { TrainSoldiersCommand } from './TrainSoldiersCommand';
import { TrainSoldiers } from './TrainSoldiers';
import { Either, EmptyResult, failure, success } from '../../../Shared/Aplication/Result';
import { InvalidSoldier } from '../domain/InvalidSoldier';
import { InvalidNumberOfSoldiers } from '../domain/InvalidNumberOfSoldiers';
import { TownNotFound } from './TownNotFound';
import { CommandHandler } from '../../../Shared/Domain/CommandHandler';
import { CommandClass } from '../../../Shared/Domain/Command';
import { TownId } from '../domain/TownId';
import { TownSoldiers } from '../domain/TownSoldiers';
import { UserId } from '../../../IAM/Users/Domain/UserId';
import { Forbidden } from '../../Shared/Domain/Forbidden';

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
    const userId = UserId.create(command.userId);
    const townId = TownId.create(command.townId);
    const soldiersCreation = TownSoldiers.create(command.soldiers);

    if (soldiersCreation.isFailure()) return failure(soldiersCreation.value);

    const soldiers = soldiersCreation.value;
    const trainSoldiers = await this.trainSoldiers.execute({ userId, townId, soldiers });

    return trainSoldiers.isSuccess() ? success() : failure(trainSoldiers.value);
  }
}
