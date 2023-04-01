import type { ApolloError } from '@apollo/client';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { BaseError, ErrorTypes, ForbiddenError, UnexpectedError } from '../../__generated__/graphql';

export class ErrorFactory {
  static create = (error: ErrorTypes, status: number, message: string): BaseError => ({
    error,
    status,
    message
  });

  static unauthorized(message: string): BaseError {
    return this.create(ErrorTypes.Unauthorized, 401, message);
  }

  static forbidden(message: string): BaseError {
    return this.create(ErrorTypes.Forbidden, 403, message);
  }

  static notFound(message: string): BaseError {
    return this.create(ErrorTypes.NotFound, 404, message);
  }

  static unexpected(message: string): BaseError {
    return this.create(ErrorTypes.Unexpected, 500, message);
  }
}

export const useUnexpectedError = <Error>(
  setError: Dispatch<SetStateAction<BaseError | undefined>>,
  apolloError?: ApolloError
) => {
  useEffect(() => {
    if (apolloError) {
      console.error(apolloError);
      setError(ErrorFactory.unexpected(apolloError.message));
    }
  }, [apolloError]);
};

export function isUnexpectedError(error?: BaseError): error is UnexpectedError {
  return error?.error === ErrorTypes.Unexpected;
}

export function isForbiddenError(error?: BaseError): error is ForbiddenError {
  return error?.error === ErrorTypes.Forbidden;
}
