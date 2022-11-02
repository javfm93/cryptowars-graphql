import {useMutation} from 'react-query';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {AppRoutes} from '../../App';
import {WorldPrimitives} from '../../../../../../Contexts/CryptoWars/Worlds/Domain/World';
// todo: prefix of the backend endpoint
// todo: add the credentials for everything
export const useJoinWorld = () => {
  const navigate = useNavigate();
  // todo: type
  const mutation = useMutation((data: { worldId: string }) =>
    axios.put(`${import.meta.env.VITE_BACKEND_URL}/worlds/${data.worldId}/join`, null, {
      withCredentials: true
    })
  );
  const joinWorld = (world: WorldPrimitives) => () => {
    mutation.mutate(
      { worldId: world.id },
      {
        onSuccess: () => {
          navigate(AppRoutes.town);
        },
        onError: console.error
      }
    );
  };
  return { joinWorld };
};
