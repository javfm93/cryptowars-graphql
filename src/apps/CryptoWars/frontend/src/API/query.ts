import { UseQueryResult } from 'react-query';

export type SucceededQuery<Result> = {
  result: Result;
  isLoading: false;
  error: null;
};

export const succeededQuery = <Result>(result: Result): SucceededQuery<Result> => ({
  result,
  isLoading: false,
  error: null
});

export type FailedQuery = {
  result: null;
  isLoading: false;
  error: unknown;
};

export const failedQuery = (error: unknown): FailedQuery => ({
  result: null,
  isLoading: false,
  error
});

export type LoadingQuery = {
  result: null;
  isLoading: true;
  error: null;
};

export const loadingQuery = (): LoadingQuery => ({
  result: null,
  isLoading: true,
  error: null
});

export const handleQueryResult = <Response>(queryResult: UseQueryResult<Response>) =>
  queryResult.isSuccess
    ? succeededQuery(queryResult.data)
    : queryResult.error
    ? failedQuery(queryResult.error)
    : loadingQuery();

export type QueryTrigger<Args, Response> = (
  args: Args
) => SucceededQuery<Response> | LoadingQuery | FailedQuery;
