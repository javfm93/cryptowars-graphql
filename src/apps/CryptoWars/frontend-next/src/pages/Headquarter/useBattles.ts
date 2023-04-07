import { handleQueryResult } from '../../API/query';
import { useState } from 'react';
import { BaseError } from '../../../../../../../tests/apps/CryptoWars/backend/__generated__/graphql';
import { useUnexpectedError } from '../../API/useUnexpectedError';
import { gql } from '../../../../../../../tests/apps/CryptoWars/backend/__generated__';
import { useQuery } from '@apollo/client';

export const useBattles = (armyId: string) => {
  const { data, error } = useQuery(headquarterPageQuery, { variables: { armyId } });
  const [domainError, setError] = useState<BaseError>();
  useUnexpectedError(setError, error);

  return handleQueryResult(data?.GetBattles, domainError);
};
export const headquarterPageQuery = gql(/* GraphQL */ `
  query HeadquarterPageQuery($armyId: String!) {
    GetBattles(armyId: $armyId) {
      battles {
        ...Battle
      }
    }
  }
`);
