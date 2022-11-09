import {useMutation} from 'react-query';
import axios from 'axios';
import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {AppRoutes} from '../../App';

// todo: improve execute and error definition and move to a shared place
// todo: frontend validation
export type CommandTrigger = () => {
  execute(username: string, password: string): void;
  isExecuting: boolean;
  succeeded: boolean;
  error: unknown;
};

export const useUserLogin: CommandTrigger = () => {
  const navigateTo = useNavigate();
  const loginMutation = useMutation((login: { username: string; password: string }) =>
    axios.post(`${import.meta.env.VITE_BACKEND_URL}/login`, login, { withCredentials: true })
  );
  useEffect(() => {
    if (loginMutation.isSuccess) {
      navigateTo(AppRoutes.home);
    }
  }, [loginMutation.isSuccess]);

  const execute = (username: string, password: string): void => {
    loginMutation.mutate({ username, password });
  };

  return {
    execute,
    isExecuting: loginMutation.isLoading,
    succeeded: loginMutation.isSuccess,
    error: loginMutation.error
  };
};
