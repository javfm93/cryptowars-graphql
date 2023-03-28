import { v4 } from 'uuid';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../App';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../../../../../../../tests/apps/CryptoWars/backend/IAM/Users/createUserMutation';
import * as faker from 'faker';
import { CreateUserErrors } from '../../../../../../../tests/apps/CryptoWars/backend/__generated__/graphql';
import { assertNeverHappen } from '../../../../../../Contexts/Shared/Domain/Primitives';
import { useUnexpectedError } from '../../API/useUnexpectedError';
import { handleMutationResult } from '../../API/command';

export const useUserRegistration = () => {
  const navigateTo = useNavigate();
  const [createUser, { data, loading, error, called }] = useMutation(CREATE_USER);
  const [domainError, setError] = useState<CreateUserErrors | undefined>();

  useUnexpectedError(setError, error);

  useEffect(() => {
    const result = data?.createUser;
    if (result && result.__typename) {
      switch (result.__typename) {
        case 'SuccessCommand':
          navigateTo(AppRoutes.selectWorld);
          break;
        case 'ConflictError':
          setError(result);
          break;
        case 'InvalidInputError':
          setError(result);
          break;
        default:
          assertNeverHappen(result.__typename);
      }
    }
  }, [data]);

  const execute = async (email: string, password: string) => {
    await createUser({
      variables: { user: { id: v4(), email, password, name: faker.internet.userName() } }
    });
  };

  return handleMutationResult(execute, loading, called, domainError);
};
