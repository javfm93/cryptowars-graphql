import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { gql, useFragment } from '../../../../../../../tests/apps/CryptoWars/backend/__generated__';
import {
  ChatPagePlayerQuery,
  FailureFragment
} from '../../../../../../../tests/apps/CryptoWars/backend/__generated__/graphql';
import { assertNeverHappen } from '../../../../../../Contexts/Shared/Domain/Primitives';
import { failureFragment } from '../../API/failureFragment';
import { handleQueryResult } from '../../API/query';
import { useUnexpectedError } from '../../API/useUnexpectedError';
import { PickOperationUnionMember } from '../../Types/grahql';

type Result = PickOperationUnionMember<ChatPagePlayerQuery['GetPlayer'], 'Player'>;

export const useChatPagePlayer = () => {
  const { data, error } = useQuery(chatPagePlayerQuery);
  const [domainError, setError] = useState<FailureFragment>();
  const [result, setResult] = useState<Result>();

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

export const chatPagePlayerQuery = gql(/* GraphQL */ `
  query ChatPagePlayer {
    GetPlayer {
      id
    }
  }
`);
