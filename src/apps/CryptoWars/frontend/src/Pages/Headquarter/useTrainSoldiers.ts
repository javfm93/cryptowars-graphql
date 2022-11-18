import {useMutation, useQueryClient} from 'react-query';
import axios from 'axios';
import {TrainSoldiersPostRequest} from '../../../../backend/Controllers/Towns/TrainSoldiersPostRequest';
// todo: prefix of the backend endpoint
export const useTrainSoldiers = (townId: string) => {
  // todo: type
  const queryClient = useQueryClient();
  const mutation = useMutation((soldiers: TrainSoldiersPostRequest) =>
    axios.post(`${import.meta.env.VITE_BACKEND_URL}/towns/${townId}/train-soldiers`, soldiers, {
      withCredentials: true
    })
  );
  const trainSoldiers = (soldiers: TrainSoldiersPostRequest) => {
    mutation.mutate(soldiers, {
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ['townArmy'] });
        console.log('trained!');
      },
      onError: console.error
    });
  };
  return { trainSoldiers };
};
