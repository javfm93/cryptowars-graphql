import { useQuery } from 'react-query';
import axios from 'axios';
import { handleQueryResult, QueryTrigger } from '../../API/query';
import { DirectChatsResponse } from '../../../../backend/Controllers/Communication/Chats/DirectChatsResponse';

export const useDirectChats: QueryTrigger<void, DirectChatsResponse> = () => {
  const getDirectChats = async (): Promise<DirectChatsResponse> => {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/direct-chats`, {
      withCredentials: true
    });
    return response.data;
  };
  return handleQueryResult<DirectChatsResponse>(useQuery('directChats', getDirectChats));
};
