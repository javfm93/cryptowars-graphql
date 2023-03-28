import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../App';
import { LoginErrors } from '../../../../../../../tests/apps/CryptoWars/backend/__generated__/graphql';
import { useUnexpectedError } from '../../API/useUnexpectedError';
import { assertNeverHappen } from '../../../../../../Contexts/Shared/Domain/Primitives';
import { handleMutationResult } from '../../API/command';
import { LOGIN } from '../../../../../../../tests/apps/CryptoWars/backend/IAM/Auth/LoginMutation';
import { useMutation } from '@apollo/client';

export const useUserLogin = () => {
  const navigateTo = useNavigate();
  const [login, { data, loading, error, called }] = useMutation(LOGIN);
  const [domainError, setError] = useState<LoginErrors | undefined>();

  useUnexpectedError(setError, error);

  useEffect(() => {
    const result = data?.Login;
    if (result && result.__typename) {
      switch (result.__typename) {
        case 'SuccessCommand':
          navigateTo(AppRoutes.home);
          break;
        case 'InvalidInputError':
          setError(result);
          break;
        default:
          assertNeverHappen(result.__typename);
      }
    }
  }, [data]);

  const execute = async (email: string, password: string): Promise<void> => {
    await login({ variables: { login: { email, password } } });
  };

  return handleMutationResult(execute, loading, called, domainError);
};
