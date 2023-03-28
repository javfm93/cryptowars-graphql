import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../App';
import { JoinWorldErrors } from '../../../../../../../tests/apps/CryptoWars/backend/__generated__/graphql';
import { handleMutationResult } from '../../API/command';
import { useEffect, useState } from 'react';
import { useUnexpectedError } from '../../API/useUnexpectedError';
import { assertNeverHappen } from '../../../../../../Contexts/Shared/Domain/Primitives';
import { JOIN_WORLD } from '../../../../../../../tests/apps/CryptoWars/backend/CryptoWars/Worlds/joinWorldMutation';
import { useMutation } from '@apollo/client';

export const useJoinWorld = () => {
  const navigateTo = useNavigate();
  const [joinWorld, { data, loading, error, called }] = useMutation(JOIN_WORLD);
  const [domainError, setError] = useState<JoinWorldErrors | undefined>();

  useUnexpectedError(setError, error);

  useEffect(() => {
    const result = data?.JoinWorld;
    if (result && result.__typename) {
      switch (result.__typename) {
        case 'SuccessCommand':
          navigateTo(AppRoutes.home);
          break;
        case 'NotFoundError':
          setError(result);
          break;
        default:
          assertNeverHappen(result.__typename);
      }
    }
  }, [data]);

  const execute = async (id: string) => {
    await joinWorld({ variables: { id } });
  };

  return handleMutationResult(execute, loading, called, domainError);
};
