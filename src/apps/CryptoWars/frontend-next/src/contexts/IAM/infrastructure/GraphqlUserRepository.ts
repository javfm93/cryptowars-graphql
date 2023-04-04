import { assertNeverHappen } from '@/contexts/shared/application/mutation';
import { CommandResult, failure, success } from '@/contexts/shared/application/result';
import { ErrorFactory } from '@/contexts/shared/domain/Errors';
import { gql } from '@/contexts/shared/domain/__generated__';
import { CreateUserErrors, LoginErrors } from '@/contexts/shared/domain/__generated__/graphql';
import { ApolloClient } from '@apollo/client';
import { Service } from 'diod';
import { v4 } from 'uuid';
import { UserRepository } from '../domain/userRepository';

@Service()
export class GraphqlUserRepository implements UserRepository {
  constructor(readonly client: ApolloClient<any>) { }
  async login(email: string, password: string): Promise<CommandResult<LoginErrors>> {
    const data = await this.client.mutate({ mutation: LOGIN, variables: { login: { email, password } } });
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

  async register(email: string, password: string): Promise<CommandResult<CreateUserErrors>> {
    const data = await this.client.mutate({
      mutation: CREATE_USER, variables: { user: { id: v4(), email, password, name: `randomPlayer${Math.floor(Math.random() * 1000)}` } }
    });
    if (data.errors) {
      return failure(ErrorFactory.unexpected(data.errors[0].message));
    }
    const result = data.data?.createUser;

    if (result && result.__typename) {
      switch (result.__typename) {
        case 'SuccessCommand':
          return success();
        case 'ConflictError':
          return failure(result);
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

export const CREATE_USER = gql(/* GraphQL */ `
  mutation CreateUser($user: CreateUserInput!) {
    createUser(user: $user) {
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
