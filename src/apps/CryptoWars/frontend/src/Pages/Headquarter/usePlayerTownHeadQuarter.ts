import { handleQueryResult } from '../../API/query';
import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import {
  FailureFragment,
  PlayerTownsHeadQuarterQuery
} from '../../../../../../../tests/apps/CryptoWars/backend/__generated__/graphql';
import { gql, useFragment } from '../../../../../../../tests/apps/CryptoWars/backend/__generated__';
import { assertNeverHappen } from '../../../../../../Contexts/Shared/Domain/Primitives';
import { PickOperationUnionMember } from '../../Types/grahql';
import { failureFragment } from '../../API/failureFragment';
import { ErrorFactory, useUnexpectedError } from '../../API/useUnexpectedError';

type PlayerQueryResult = PickOperationUnionMember<
  PlayerTownsHeadQuarterQuery['GetPlayer'],
  'Player'
>;
type Headquarter = PlayerQueryResult['towns'][number]['buildings']['headquarter'];

export const usePlayerTownHeadquarter = (id: string) => {
  const { data, error } = useQuery(playerTownsHeadQuarterQuery);
  const [domainError, setError] = useState<FailureFragment>();
  const [result, setResult] = useState<Headquarter>();

  useUnexpectedError(setError, error);

  useEffect(() => {
    if (data?.GetPlayer.__typename) {
      switch (data.GetPlayer.__typename) {
        case 'Player':
          const headquarter = data.GetPlayer.towns.find(town => town.id === id)?.buildings
            .headquarter;
          headquarter
            ? setResult(headquarter)
            : setError(ErrorFactory.unauthorized('This town does not belong to you'));
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

const playerTownsHeadQuarterQuery = gql(/* GraphQL */ `
  query PlayerTownsHeadQuarter {
    GetPlayer {
      ... on Player {
        towns {
          id
          buildings {
            headquarter {
              units {
                ...TownSoldier
              }
            }
          }
        }
      }
      ...Failure
    }
  }
`);
