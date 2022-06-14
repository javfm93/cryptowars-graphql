import { Router } from 'express';
import container from '../dependency-injection';
import { UserPutController } from '../Controllers/UserPutController';

export const register = (router: Router) => {
  const playerPutController: UserPutController = container.get(
    'Apps.Cryptowars.Backend.Controllers.PlayersPutController'
  );
  router.put('/players/:id', playerPutController.run.bind(playerPutController));
};
