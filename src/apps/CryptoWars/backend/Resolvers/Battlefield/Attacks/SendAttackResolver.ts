import { CommandBus } from '../../../../../../Contexts/Shared/Domain/CommandBus';
import { SendAttackCommand } from '../../../../../../Contexts/Battlefield/Attacks/Application/Send/SendAttackCommand';
import { SendAttackCommandErrors } from '../../../../../../Contexts/Battlefield/Attacks/Application/Send/SendAttackCommandHandler';
import { logger } from '../../../../../../Contexts/Shared/Infrastructure/WinstonLogger';
import { BaseResolver, Resolver } from '../../Resolver';
import { Arg, Ctx, Mutation } from 'type-graphql';
import { SuccessCommand, SuccessCommandResult } from '../../ResolverResult';
import {
  ConflictError,
  ForbiddenError,
  InvalidInputError,
  NotFoundError
} from '../../ResolverErrors';
import { Authenticated } from '../../IAM/Auth/AuthChecker';
import { ServerContext } from '../../../server';
import { SendAttackInput } from './SendAttackInput';
import { UnreachableCaseError } from '../../../../../../Contexts/Shared/Domain/Errors/UnreachableCaseError';

const Result = SuccessCommandResult('SendAttack', [
  InvalidInputError,
  ForbiddenError,
  NotFoundError,
  ConflictError
]);

@Resolver()
export class SendAttackResolver implements BaseResolver {
  constructor(private commandBus: CommandBus) {}

  @Authenticated()
  @Mutation(returns => Result)
  async SendAttack(
    @Arg('input') input: SendAttackInput,
    @Ctx() context: ServerContext
  ): Promise<typeof Result> {
    const playerId = context.getUser().playerId;

    const sendAttackCommand = new SendAttackCommand({
      ...input,
      playerId
    });
    const result = await this.commandBus.dispatch<SendAttackCommandErrors>(sendAttackCommand);
    return result.isSuccess() ? new SuccessCommand() : this.handleError(result.value);
  }

  private handleError(error: SendAttackCommandErrors) {
    logger.error(error.stack);
    const errorName = error.errorName();
    switch (errorName) {
      case 'ArmyNotFound':
        return new NotFoundError(error.message);
      case 'InvalidNumberOfSoldiers':
        return new InvalidInputError(error.message);
      case 'Forbidden':
        return new ForbiddenError(error.message);
      case 'AttackAlreadyExist':
        return new ConflictError(error.message);
      case 'InvalidSquad':
        return new InvalidInputError(error.message);
      default:
        throw new UnreachableCaseError(errorName);
    }
  }
}
