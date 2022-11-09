import {useMutation, useQueryClient} from 'react-query';
import axios from 'axios';
import {TrainSoldiersPostRequest} from '../../../../backend/Controllers/Towns/TrainSoldiersPostRequest';
// todo: prefix of the backend endpoint
export const useTrainSoldiers = () => {
  // todo: type
  const queryClient = useQueryClient();
  const mutation = useMutation((data: { townId: string; body: TrainSoldiersPostRequest }) =>
    axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/towns/${data.townId}/train-soldiers`,
      data.body,
      {
        withCredentials: true
      }
    )
  );
  const trainSoldiers = (townId: string, soldiers: TrainSoldiersPostRequest) => () => {
    mutation.mutate(
      { townId, body: soldiers },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries({ queryKey: ['townArmy'] });
          console.log('trained!');
        },
        onError: console.error
      }
    );
  };
  return { trainSoldiers };
};
