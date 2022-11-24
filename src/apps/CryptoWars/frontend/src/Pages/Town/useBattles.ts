import { useQuery } from 'react-query';
import axios from 'axios';
import { handleQueryResult, QueryTrigger } from '../../API/query';
import { BattlesResponse } from '../../../../backend/Controllers/Battlefield/Battles/BattlesResponse';

export const useBattles: QueryTrigger<string | undefined, BattlesResponse> = (armyId?: string) => {
  const getBattles = async (): Promise<BattlesResponse> => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/battles?armyId=${armyId}`,
      {
        withCredentials: true
      }
    );
    return response.data;
  };
  return handleQueryResult<BattlesResponse>(
    useQuery('getBattles', getBattles, { enabled: !!armyId })
  );
};
