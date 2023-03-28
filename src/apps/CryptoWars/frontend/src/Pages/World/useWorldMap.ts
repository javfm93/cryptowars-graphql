import { handleQueryResult } from '../../API/query';
import { BaseError } from '../../../../../../../tests/apps/CryptoWars/backend/__generated__/graphql';
import { useState } from 'react';
import { useUnexpectedError } from '../../API/useUnexpectedError';
import { gql } from '../../../../../../../tests/apps/CryptoWars/backend/__generated__';
import { useQuery } from '@apollo/client';

export const useWorldMap = (id: string) => {
  const { data, error } = useQuery(worldPageQuery, { variables: { id } });
  const [domainError, setError] = useState<BaseError>();
  useUnexpectedError(setError, error);

  return handleQueryResult(data?.GetWorldMap, domainError);
};

const worldPageQuery = gql(/* GraphQL */ `
  query GetWorldMap($id: String!) {
    GetWorldMap(id: $id) {
      id
      name
      towns {
        id
        playerId
      }
    }
  }
`);
