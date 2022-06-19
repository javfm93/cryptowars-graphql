import { useQuery } from 'react-query';
import axios from 'axios';
import { ListWorldsResponse } from '../../../../backend/Controllers/Worlds/ListWorldsResponse';

export type LoadingQueryTrigger = {
  result: null;
  isLoading: true;
  error: null;
};

export type FailedQueryTrigger = {
  result: null;
  isLoading: false;
  error: unknown;
};

export type SucceededQueryTrigger<Result> = {
  result: Result;
  isLoading: false;
  error: null;
};

export type QueryTrigger<Args, Response> = (
  args: Args
) => SucceededQueryTrigger<Response> | LoadingQueryTrigger | FailedQueryTrigger;

export const useWorlds: QueryTrigger<void, ListWorldsResponse> = () => {
  const getWorlds = async (): Promise<ListWorldsResponse> => {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/worlds`);
    return response.data;
  };
  const worldsQuery = useQuery('worlds', getWorlds);

  return worldsQuery.isSuccess
    ? {
        result: worldsQuery.data,
        isLoading: false,
        error: null
      }
    : worldsQuery.error
    ? {
        result: null,
        isLoading: false,
        error: worldsQuery.error
      }
    : {
        result: null,
        isLoading: true,
        error: null
      };
};
