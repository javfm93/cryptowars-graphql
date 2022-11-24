import { useQuery } from 'react-query';
import axios from 'axios';
import { handleQueryResult, QueryTrigger } from '../../API/query';
import { PlayerResponse } from '../../../../backend/Controllers/CryptoWars/Players/PlayerResponse';

export const usePlayer: QueryTrigger<void, PlayerResponse> = () => {
  const getPlayer = async (): Promise<PlayerResponse> => {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/player`, {
      withCredentials: true
    });
    return response.data;
  };
  return handleQueryResult<PlayerResponse>(useQuery('player', getPlayer));
};
