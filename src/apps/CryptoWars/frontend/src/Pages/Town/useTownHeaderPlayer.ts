import { handleQueryResult } from '../../API/query';
import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { gql } from '../../../../../../../tests/apps/CryptoWars/backend/__generated__';
import {
  GetPlayerErrors,
  TownHeaderPlayerQuery
} from '../../../../../../../tests/apps/CryptoWars/backend/__generated__/graphql';
import { assertNeverHappen } from '../../../../../../Contexts/Shared/Domain/Primitives';
import { PickOperationUnionMember } from '../../Types/grahql';
import { useUnexpectedError } from '../../API/useUnexpectedError';

export type TownHeaderQueryResult = PickOperationUnionMember<
  TownHeaderPlayerQuery['GetPlayer'],
  'Player'
>;

export const useTownHeaderPlayer = () => {
  const { data, error } = useQuery(townHeaderPlayerQuery);
  const [domainError, setError] = useState<GetPlayerErrors>();
  const [result, setResult] = useState<TownHeaderQueryResult>();

  useUnexpectedError(setError, error);

  useEffect(() => {
    if (data?.GetPlayer.__typename) {
      switch (data.GetPlayer.__typename) {
        case 'Player':
          setResult(data.GetPlayer);
          break;
        case 'NotFoundError':
          setError(data.GetPlayer);
          break;
        default:
          assertNeverHappen(data.GetPlayer.__typename);
      }
    }
  }, [data]);

  return handleQueryResult(result, domainError);
};

const townHeaderPlayerQuery = gql(/* GraphQL */ `
  query TownHeaderPlayer {
    GetPlayer {
      ... on Player {
        towns {
          id
          buildings {
            essenceGenerator {
              generationPerHour
            }
            warehouse {
              assets {
                essence {
                  stored
                  lastStorageUpdate
                }
              }
            }
          }
        }
        worlds {
          id
        }
      }
      ... on BaseError {
        error
        message
        status
      }
    }
  }
`);
