import { CommandBus } from '../../../../../../Contexts/Shared/Domain/CommandBus';
import { JoinWorldCommand } from '../../../../../../Contexts/CryptoWars/Worlds/Application/Join/JoinWorldCommand';
import { JoinWorldCommandResultErrors } from '../../../../../../Contexts/CryptoWars/Worlds/Application/Join/JoinWorldCommandHandler';
import { BaseResolver, RegisterResolver } from '../../Resolver';
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import { SuccessCommand, SuccessCommandResult } from '../../ResolverResult';
import { NotFoundError } from '../../ResolverErrors';
import { ServerContext } from '../../../server';
import { UnreachableCaseError } from '../../../../../../Contexts/Shared/Domain/Errors/UnreachableCaseError';
import { Authenticated } from '../../IAM/Auth/AuthChecker';

const Result = SuccessCommandResult('JoinWorld', [NotFoundError]);

@RegisterResolver()
@Resolver()
export class JoinWorldResolver implements BaseResolver {
  constructor(private commandBus: CommandBus) {}

  @Authenticated()
  @Mutation(returns => Result)
  async JoinWorld(@Arg('id') id: string, @Ctx() context: ServerContext): Promise<typeof Result> {
    const userId = context.getUser().id;
    const joinWorldCommand = new JoinWorldCommand({ worldId: id, userId });
    const result = await this.commandBus.dispatch<JoinWorldCommandResultErrors>(joinWorldCommand);
    return result.isSuccess() ? new SuccessCommand() : this.handleError(result.value);
  }
  private handleError(error: JoinWorldCommandResultErrors) {
    const errorName = error.errorName();
    switch (errorName) {
      case 'WorldNotFoundError':
        return new NotFoundError(error.message);
      case 'PlayerNotFoundError':
        return new NotFoundError(error.message);
      default:
        throw new UnreachableCaseError(errorName);
    }
  }
}
