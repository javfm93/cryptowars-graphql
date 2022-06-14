import { Router } from 'express';
import container from '../dependency-injection';
import { UsersPutController } from '../Controllers/UsersPutController';

export const register = (router: Router) => {
  const userPutController: UsersPutController = container.get(
    'Apps.CryptoWars.Backend.Controllers.UsersPutController'
  );
  router.put('/users/:id', userPutController.run.bind(userPutController));
};
