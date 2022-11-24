import { useQuery } from 'react-query';
import axios from 'axios';
import { WorldsResponse } from '../../../../backend/Controllers/CryptoWars/Worlds/WorldsResponse';
import { handleQueryResult, QueryTrigger } from '../../API/query';

export const useWorlds: QueryTrigger<void, WorldsResponse> = () => {
  const getWorlds = async (): Promise<WorldsResponse> => {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/worlds`, {
      withCredentials: true
    });
    return response.data;
  };
  return handleQueryResult<WorldsResponse>(useQuery('worlds', getWorlds));
};
