import { Arg, Query, Resolver } from 'type-graphql';
import { resolverResult } from '../../ResolverResult';
import { UserSchema } from '../../../../../../Contexts/IAM/Users/Infrastructure/UserSchema';
import { NotFoundError } from '../../ResolverErrors';
import { RegisterResolver } from '../../Resolver';
import { UserGenerator } from '../../../../../../../tests/Contexts/IAM/Users/Domain/UserGenerator';
// import { Service } from "typedi";

const UserOrError = resolverResult('FindUser', UserSchema, [NotFoundError]);

@RegisterResolver()
@Resolver()
export class FindUserByNameResolver {
  constructor() {}

  @Query(returns => UserOrError)
  async findUserByName(@Arg('name') name: string): Promise<typeof UserOrError> {
    return UserGenerator.random().toPrimitives();
  }
}
