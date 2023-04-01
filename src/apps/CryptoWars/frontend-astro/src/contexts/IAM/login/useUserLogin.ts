import { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { useUnexpectedError } from '../../shared/useUnexpectedError';
import type { LoginErrors } from '../../../__generated__/graphql';
import { assertNeverHappen, handleMutationResult } from '../../shared/command';
import { gql } from '../../../__generated__';

export const useUserLogin = () => {
  const [login, { data, loading, error, called }] = useMutation(LOGIN);
  const [domainError, setError] = useState<LoginErrors | undefined>();

  useUnexpectedError(setError, error);

  useEffect(() => {
    const result = data?.Login;
    if (result && result.__typename) {
      switch (result.__typename) {
        case 'SuccessCommand':
          console.log('success')
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
