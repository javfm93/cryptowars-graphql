import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import { BaseResolver, RegisterResolver } from '../../Resolver';
import { SuccessCommand, SuccessCommandResult } from '../../ResolverResult';
import { InvalidInputError } from '../../ResolverErrors';
import { LoginInput } from './LoginInput';
import { ServerContext } from '../../../server';

const Result = SuccessCommandResult('Login', [InvalidInputError]);

@RegisterResolver()
@Resolver()
export class LoginResolver implements BaseResolver {
  @Mutation(returns => Result)
  async Login(
    @Arg('login') login: LoginInput,
    @Ctx() context: ServerContext
  ): Promise<typeof Result> {
    const { user } = await context.authenticate('graphql-local', login);
    if (!user) return new InvalidInputError('Invalid username or password');
    await context.login(user);
    return new SuccessCommand();
  }
}
