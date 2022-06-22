import { useQuery, UseQueryResult } from 'react-query';
import axios from 'axios';
import { ListWorldsResponse } from '../../../../backend/Controllers/Worlds/ListWorldsResponse';

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

export const useWorlds: QueryTrigger<void, ListWorldsResponse> = () => {
  const getWorlds = async (): Promise<ListWorldsResponse> => {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/worlds`, {
      withCredentials: true
    });
    return response.data;
  };
  return handleQueryResult<ListWorldsResponse>(useQuery('worlds', getWorlds));
};
