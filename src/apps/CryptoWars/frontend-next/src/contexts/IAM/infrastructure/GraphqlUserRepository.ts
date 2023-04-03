import { assertNeverHappen } from '@/contexts/shared/application/mutation';
import { CommandResult, failure, success } from '@/contexts/shared/application/result';
import { ErrorFactory } from '@/contexts/shared/domain/Errors';
import { gql } from '@/contexts/shared/domain/__generated__';
import { LoginErrors } from '@/contexts/shared/domain/__generated__/graphql';
import { client } from '@/pages/_app';
import { Service } from 'diod';
import { UserRepository } from '../domain/userRepository';

@Service()
export class GraphqlUserRepository implements UserRepository {
  async login(email: string, password: string): Promise<CommandResult<LoginErrors>> {
    const data = await client.mutate({ mutation: LOGIN, variables: { login: { email, password } } });
    if (data.errors) {
      return failure(ErrorFactory.unexpected(data.errors[0].message));
    }

    const result = data.data?.Login;
    if (data.data && result && result.__typename) {
      switch (result.__typename) {
        case 'SuccessCommand':
          return success();
        case 'InvalidInputError':
          return failure(result);
        default:
          assertNeverHappen(result.__typename);
      }
    }
    return failure(ErrorFactory.unexpected());
  }
}

export const LOGIN = gql(/* GraphQL */ `
  mutation Login($login: LoginInput!) {
    Login(login: $login) {
      ... on SuccessCommand {
        isSuccess
      }
      ... on BaseError {
        error
        message
        status
      }
    }
  }
`);

export const homePagePlayerQuery = gql(/* GraphQL */ `
  query HomePagePlayer {
    GetPlayer {
      ... on Player {
        towns {
          ...PlayerTowns
        }
      }
      ...Failure
    }
  }
`);
