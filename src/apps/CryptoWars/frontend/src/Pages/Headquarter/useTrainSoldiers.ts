import { useEffect, useState } from 'react';
import {
  TownSoldiers,
  TrainSoldiersErrors
} from '../../../../../../../tests/apps/CryptoWars/backend/__generated__/graphql';
import { useUnexpectedError } from '../../API/useUnexpectedError';
import { assertNeverHappen } from '../../../../../../Contexts/Shared/Domain/Primitives';
import { handleMutationResult } from '../../API/command';
import { TRAIN_SOLDIERS } from '../../../../../../../tests/apps/CryptoWars/backend/CryptoWars/Towns/trainSoldiersMutation';
import { useMutation } from '@apollo/client';

export const useTrainSoldiers = (townId: string) => {
  const [trainSoldiers, { data, loading, error, called }] = useMutation(TRAIN_SOLDIERS);
  const [domainError, setError] = useState<TrainSoldiersErrors>();

  useUnexpectedError(setError, error);

  useEffect(() => {
    const result = data?.TrainSoldiers;
    if (result && result.__typename) {
      switch (result.__typename) {
        case 'SuccessCommand':
          console.log('trained!');
          break;
        case 'InvalidInputError':
          setError(result);
          break;
        case 'NotFoundError':
          setError(result);
          break;
        case 'ForbiddenError':
          setError(result);
          break;

        default:
          assertNeverHappen(result.__typename);
      }
    }
  }, [data]);

  const execute = async (soldiers: TownSoldiers): Promise<void> => {
    await trainSoldiers({ variables: { input: { townId, soldiers } } });
  };

  return handleMutationResult(execute, loading, called, domainError);
};
