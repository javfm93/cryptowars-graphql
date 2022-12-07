import { useQuery } from 'react-query';
import axios from 'axios';
import { handleQueryResult, QueryTrigger } from '../../API/query';
import { DirectChatMessagesResponse } from '../../../../backend/Controllers/Communication/Chats/DirectChatMessagesResponse';

export const useDirectChatMessages: QueryTrigger<string | undefined, DirectChatMessagesResponse> = (
  chatId?: string
) => {
  const directChatMessages = async (): Promise<DirectChatMessagesResponse> => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/direct-chats/${chatId}/messages`,
      {
        withCredentials: true
      }
    );
    return response.data;
  };
  return handleQueryResult<DirectChatMessagesResponse>(
    useQuery('directChatMessages', directChatMessages, { enabled: !!chatId })
  );
};
