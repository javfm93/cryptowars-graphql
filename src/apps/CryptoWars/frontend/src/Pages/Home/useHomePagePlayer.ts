import { handleQueryResult } from '../../API/query';
import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { gql, useFragment } from '../../../../../../../tests/apps/CryptoWars/backend/__generated__';
import {
  FailureFragment,
  HomePagePlayerQuery
} from '../../../../../../../tests/apps/CryptoWars/backend/__generated__/graphql';
import { assertNeverHappen } from '../../../../../../Contexts/Shared/Domain/Primitives';
import { PickOperationUnionMember } from '../../Types/grahql';
import { failureFragment } from '../../API/failureFragment';
import { useUnexpectedError } from '../../API/useUnexpectedError';

type PlayerQueryResult = PickOperationUnionMember<HomePagePlayerQuery['GetPlayer'], 'Player'>;

export const useHomePagePlayer = () => {
  const { data, error } = useQuery(homePagePlayerQuery);
  const [domainError, setError] = useState<FailureFragment>();
  const [result, setResult] = useState<PlayerQueryResult>();

  useUnexpectedError(setError, error);

  useEffect(() => {
    if (data?.GetPlayer.__typename) {
      switch (data.GetPlayer.__typename) {
        case 'Player':
          setResult(data.GetPlayer);
          break;
        case 'NotFoundError':
          setError(useFragment(failureFragment, data.GetPlayer));
          break;
        default:
          assertNeverHappen(data.GetPlayer.__typename);
      }
    }
  }, [data]);

  return handleQueryResult(result, domainError);
};

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
