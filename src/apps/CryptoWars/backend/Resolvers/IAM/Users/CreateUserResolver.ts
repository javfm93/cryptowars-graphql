import { Arg, Mutation, Resolver } from 'type-graphql';
import { BaseResolver, RegisterResolver } from '../../Resolver';
import { CommandBus } from '../../../../../../Contexts/Shared/Domain/CommandBus';
import { CreateUserCommand } from '../../../../../../Contexts/IAM/Users/Application/Create/CreateUserCommand';
import { CreateUserCommandErrors } from '../../../../../../Contexts/IAM/Users/Application/Create/CreateUserCommandHandler';
import { SuccessCommand, SuccessCommandResult } from '../../ResolverResult';
import { ConflictError, InvalidInputError } from '../../ResolverErrors';
import { CreateUserInput } from './CreateUserInput';
import { UnreachableCaseError } from '../../../../../../Contexts/Shared/Domain/Errors/UnreachableCaseError';

const Result = SuccessCommandResult('CreateUser', [InvalidInputError, ConflictError]);

@RegisterResolver()
@Resolver()
export class CreateUserResolver implements BaseResolver {
  constructor(private commandBus: CommandBus) {}

  @Mutation(returns => Result)
  async createUser(@Arg('user') user: CreateUserInput): Promise<typeof Result> {
    const command = new CreateUserCommand(user);
    const result = await this.commandBus.dispatch<CreateUserCommandErrors>(command);

    return result.isSuccess() ? new SuccessCommand() : this.handleError(result.value);
  }

  private handleError(error: CreateUserCommandErrors) {
    const errorName = error.errorName();
    switch (errorName) {
      case 'InvalidEmailError':
        return new InvalidInputError(error.message);
      case 'InvalidPasswordError':
        return new InvalidInputError(error.message);
      case 'InvalidNameError':
        return new InvalidInputError(error.message);
      case 'UserAlreadyTaken':
        return new ConflictError(error.message);
      default:
        throw new UnreachableCaseError(errorName);
    }
  }
}
