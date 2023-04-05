import { assertNeverHappen } from '@/contexts/shared/application/mutation';
import { CommandResult, Result, failure, success, successAndReturn } from '@/contexts/shared/application/result';
import { ErrorFactory } from '@/contexts/shared/domain/Errors';
import { gql } from '@/contexts/shared/domain/__generated__';
import { GetWorldsQuery, NotFoundError, UnexpectedError } from '@/contexts/shared/domain/__generated__/graphql';
import { ApolloClient } from '@apollo/client';
import { Service } from 'diod';
import { WorldRepository } from '../domain/worldRepository';

@Service()
export class GraphqlWorldRepository implements WorldRepository {
  constructor(readonly client: ApolloClient<any>) { }

  async getWorlds(): Promise<Result<GetWorldsQuery["GetWorlds"], UnexpectedError>> {
    const data = await this.client.query({ query: joinWorldPageQuery });
    if (data.data) return successAndReturn(data.data.GetWorlds);
    if (data.errors) {
      return failure(ErrorFactory.unexpected(data.errors[0].message));
    }
    return failure(ErrorFactory.unexpected());
  }

  async joinWorld(id: string): Promise<Promise<CommandResult<NotFoundError>>> {
    const request = await this.client.mutate({ mutation: JOIN_WORLD, variables: { id } });
    if (request.errors) {
      return failure(ErrorFactory.unexpected(request.errors[0].message));
    }

    const result = request.data?.JoinWorld;
    if (request.data && result && result.__typename) {
      switch (result.__typename) {
        case 'SuccessCommand':
          return success();
        case 'NotFoundError':
          return failure(result);
        default:
          assertNeverHappen(result.__typename);
      }
    }
    return failure(ErrorFactory.unexpected());
  }
}

const joinWorldPageQuery = gql(/* GraphQL */ `
  query JoinWorldPage {
    GetWorlds {
      worlds {
        id
        name
      }
    }
  }
`);

export const JOIN_WORLD = gql(/* GraphQL */ `
  mutation JoinWorld($id: String!) {
    JoinWorld(id: $id) {
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