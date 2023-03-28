import { CommandBus } from '../../../../../../Contexts/Shared/Domain/CommandBus';
import { TrainSoldiersCommand } from '../../../../../../Contexts/CryptoWars/Towns/Application/TrainSoldiers/TrainSoldiersCommand';
import { TrainSoldiersCommandErrors } from '../../../../../../Contexts/CryptoWars/Towns/Application/TrainSoldiers/TrainSoldiersCommandHandler';

import { BaseResolver, RegisterResolver } from '../../Resolver';
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import { SuccessCommand, SuccessCommandResult } from '../../ResolverResult';
import { ForbiddenError, InvalidInputError, NotFoundError } from '../../ResolverErrors';
import { ServerContext } from '../../../server';
import { Authenticated } from '../../IAM/Auth/AuthChecker';
import { TrainSoldiersInput } from './TrainSoldiersInput';
import { UnreachableCaseError } from '../../../../../../Contexts/Shared/Domain/Errors/UnreachableCaseError';

const Result = SuccessCommandResult('TrainSoldiers', [
  InvalidInputError,
  ForbiddenError,
  NotFoundError
]);

@RegisterResolver()
@Resolver()
export class TrainSoldiersResolver implements BaseResolver {
  constructor(private commandBus: CommandBus) {}

  @Authenticated()
  @Mutation(returns => Result)
  async TrainSoldiers(
    @Arg('input') input: TrainSoldiersInput,
    @Ctx() context: ServerContext
  ): Promise<typeof Result> {
    const { soldiers, townId } = input;
    const playerId = context.getUser().playerId;

    const trainSoldiersCommand = new TrainSoldiersCommand({ playerId, townId, soldiers });
    const result = await this.commandBus.dispatch<TrainSoldiersCommandErrors>(trainSoldiersCommand);
    return result.isSuccess() ? new SuccessCommand() : this.handleError(result.value);
  }

  private handleError(error: TrainSoldiersCommandErrors) {
    const errorName = error.errorName();
    switch (errorName) {
      case 'InvalidSoldier':
        return new InvalidInputError(error.message);
      case 'InvalidNumberOfSoldiers':
        return new InvalidInputError(error.message);
      case 'Forbidden':
        return new ForbiddenError(error.message);
      case 'TownNotFoundError':
        return new NotFoundError(error.message);

      default:
        throw new UnreachableCaseError(errorName);
    }
  }
}
