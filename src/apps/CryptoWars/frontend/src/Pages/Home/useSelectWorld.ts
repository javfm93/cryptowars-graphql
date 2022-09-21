import { useMutation } from 'react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../App';
import { WorldPrimitives } from '../../../../../../Contexts/CryptoWars/Worlds/Domain/World';

// todo: prefix of the backend endpoint
// todo: add the credentials for everything
export const useSelectWorld = () => {
  const navigate = useNavigate();
  // todo: type
  const mutation = useMutation((data: { worldId: string }) =>
    axios.put(`${import.meta.env.VITE_BACKEND_URL}/players/select-world`, data, {
      withCredentials: true
    })
  );
  const selectWorld = (world: WorldPrimitives) => () => {
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
  return { selectWorld };
};
