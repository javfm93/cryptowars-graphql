import { handleQueryResult } from '../../API/query';
import { useState } from 'react';
import { BaseError } from '../../../../../../../tests/apps/CryptoWars/backend/__generated__/graphql';
import { useUnexpectedError } from '../../API/useUnexpectedError';
import { gql } from '../../../../../../../tests/apps/CryptoWars/backend/__generated__';
import { useQuery } from '@apollo/client';

export const useWorlds = () => {
  const { data, error } = useQuery(selectWorldPageQuery);
  const [domainError, setError] = useState<BaseError>();
  useUnexpectedError(setError, error);

  return handleQueryResult(data?.GetWorlds, domainError);
};

const selectWorldPageQuery = gql(/* GraphQL */ `
  query SelectWorldPage {
    GetWorlds {
      worlds {
        ...WorldSelection
      }
    }
  }
`);
