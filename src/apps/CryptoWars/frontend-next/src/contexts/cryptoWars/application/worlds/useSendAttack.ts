import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { v4 } from 'uuid';
import { SendAttackRequest } from '../../../../../../backend/Controllers/Battlefield/Attacks/SendAttackRequest';

export const useSendAttack = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation((data: { body: SendAttackRequest }) =>
    axios.put(`${import.meta.env.VITE_BACKEND_URL}/attacks/${v4()}`, data.body, {
      withCredentials: true
    })
  );
  const sendAttack = (attack: SendAttackRequest) => () => {
    mutation.mutate(
      { body: attack },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries({ queryKey: ['townArmy'] });
          console.log('attack sent!');
        },
        onError: console.error
      }
    );
  };
  return { sendAttack };
};
