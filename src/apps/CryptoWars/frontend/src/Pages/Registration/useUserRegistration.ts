import { useMutation } from 'react-query';
import axios from 'axios';
import { v4 } from 'uuid';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../App';
import { CreateUserRequest } from '../../../../backend/Controllers/Users/CreateUserRequest';

// todo: improve execute and error definition and move to a shared place
// todo: frontend validation
export type CommandTrigger = () => {
  execute: Function;
  isExecuting: boolean;
  succeeded: boolean;
  error: unknown;
};

export const useUserRegistration: CommandTrigger = () => {
  const navigateTo = useNavigate();

  const registerMutation = useMutation((newUser: CreateUserRequest) =>
    axios.put(`${import.meta.env.VITE_BACKEND_URL}/users/${v4()}`, newUser)
  );
  useEffect(() => {
    if (registerMutation.isSuccess) {
      navigateTo(AppRoutes.town);
    }
  }, [registerMutation.isSuccess]);

  const execute = (email: string, password: string) => {
    registerMutation.mutate({ email, password });
  };

  return {
    execute,
    isExecuting: registerMutation.isLoading,
    succeeded: registerMutation.isSuccess,
    error: registerMutation.error
  };
};
