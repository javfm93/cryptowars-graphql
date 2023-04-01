import { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { useUnexpectedError } from '@/contexts/shared/useUnexpectedError';
import { AppRoutes } from '@/pages';
import { assertNeverHappen, handleMutationResult } from '@/contexts/shared/command';
import { LoginErrors } from '@/__generated__/graphql';
import { gql } from '@/__generated__';

export const useUserLogin = () => {
  const navigateTo = useRouter();
  const [login, { data, loading, error, called }] = useMutation(LOGIN);
  const [domainError, setError] = useState<LoginErrors | undefined>();

  useUnexpectedError(setError, error);

  useEffect(() => {
    const result = data?.Login;
    if (result && result.__typename) {
      switch (result.__typename) {
        case 'SuccessCommand':
          navigateTo.push(AppRoutes.home);
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

export const LOGIN = gql(/* GraphQL */ `
  mutation Login($login: LoginInput!) {
    Login(login: $login) {
      ... on SuccessCommand {
        isSuccess
      }
      ... on BaseError {
        error
        message
        status
      }
    }
  }
`);
