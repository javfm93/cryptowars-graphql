import { Router } from 'express';
import { UsersPutController } from '../../Controllers/IAM/Users/UsersPutController';
import { DependencyInjector } from '../../dependency-injection/dependencyInjector';

export const register = (router: Router) => {
  const userPutController = DependencyInjector.get(UsersPutController);
  router.put('/users/:id', userPutController.run.bind(userPutController));
};
