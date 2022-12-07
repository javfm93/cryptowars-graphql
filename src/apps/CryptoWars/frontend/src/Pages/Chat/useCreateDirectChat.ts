import { useMutation } from 'react-query';
import axios from 'axios';
import { v4 } from 'uuid';
import { CreateDirectChatRequest } from '../../../../backend/Controllers/Communication/Chats/CreateDirectChatRequest';

export const useCreateDirectChat = () => {
  const mutation = useMutation((data: CreateDirectChatRequest) =>
    axios.put(`${import.meta.env.VITE_BACKEND_URL}/direct-chats/${v4()}`, data, {
      withCredentials: true
    })
  );
  const createChat = (playerTwoId: string) => {
    mutation.mutate(
      { playerTwoId },
      {
        onSuccess: () => {
          console.log('chat created');
        },
        onError: console.error
      }
    );
  };
  return { createChat };
};
