import { useQuery } from 'react-query';
import axios from 'axios';
import { handleQueryResult, QueryTrigger } from '../../API/query';
import { ArmyResponse } from '../../../../backend/Controllers/Battlefield/Armies/ArmyResponse';

export const useTownArmy: QueryTrigger<string, ArmyResponse> = (townId: string) => {
  const getTownArmy = async (): Promise<ArmyResponse> => {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/army?townId=${townId}`, {
      withCredentials: true
    });
    return response.data;
  };
  return handleQueryResult<ArmyResponse>(useQuery('townArmy', getTownArmy));
};
