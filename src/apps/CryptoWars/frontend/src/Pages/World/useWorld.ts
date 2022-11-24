import { useQuery } from 'react-query';
import axios from 'axios';
import { handleQueryResult, QueryTrigger } from '../../API/query';
import { WorldResponse } from '../../../../backend/Controllers/CryptoWars/Worlds/WorldResponse';

export const useWorld: QueryTrigger<string, WorldResponse> = (id: string) => {
  const getWorld = async (): Promise<WorldResponse> => {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/worlds/${id}`, {
      withCredentials: true
    });
    return response.data;
  };
  return handleQueryResult<WorldResponse>(useQuery('world', getWorld));
};
