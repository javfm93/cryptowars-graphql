import { Result, failure, successAndReturn } from '@/contexts/shared/application/result';
import { ErrorFactory } from '@/contexts/shared/domain/Errors';
import { gql } from '@/contexts/shared/domain/__generated__';
import { HomePagePlayerQuery, UnexpectedError } from '@/contexts/shared/domain/__generated__/graphql';
import { client } from '@/pages/_app';
import { Service } from 'diod';
import { PlayerRepository } from '../domain/playerRepository';

@Service()
export class GraphqlPlayerRepository implements PlayerRepository {
  async home(): Promise<Result<HomePagePlayerQuery["GetPlayer"], UnexpectedError>> {
    const data = await client.query({ query: homePagePlayerQuery });
    if (data.data) return successAndReturn(data.data.GetPlayer);
    if (data.errors) {
      return failure(ErrorFactory.unexpected(data.errors[0].message));
    }
    return failure(ErrorFactory.unexpected());
  }
}

export const homePagePlayerQuery = gql(/* GraphQL */ `
  query HomePagePlayer {
    GetPlayer {
        towns {
          ...PlayerTowns
        }
    }
  }
`);
