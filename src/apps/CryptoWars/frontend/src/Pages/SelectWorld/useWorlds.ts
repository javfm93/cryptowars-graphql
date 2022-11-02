import { useQuery } from 'react-query';
import axios from 'axios';
import { ListWorldsResponse } from '../../../../backend/Controllers/Worlds/ListWorldsResponse';
import { handleQueryResult, QueryTrigger } from '../../API/query';

export const useWorlds: QueryTrigger<void, ListWorldsResponse> = () => {
  const getWorlds = async (): Promise<ListWorldsResponse> => {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/worlds`, {
      withCredentials: true
    });
    return response.data;
  };
  return handleQueryResult<ListWorldsResponse>(useQuery('worlds', getWorlds));
};
