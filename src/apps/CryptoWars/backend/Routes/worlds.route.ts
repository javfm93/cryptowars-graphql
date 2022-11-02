import { Router } from 'express';
import container from '../dependency-injection';
import { WorldsGetController } from '../Controllers/Worlds/WorldsGetController';
import { requireAuth } from '../Auth';
import { JoinWorldPutController } from '../Controllers/Worlds/JoinWorldPutController';

export const register = (router: Router) => {
  const worldsGetController: WorldsGetController = container.get(
    'Apps.CryptoWars.Backend.Controllers.WorldsGetController'
  );
  router.get('/worlds', requireAuth, worldsGetController.run.bind(worldsGetController));

  const selectWorldPutController: JoinWorldPutController = container.get(
    'Apps.CryptoWars.Backend.Controllers.JoinWorldPutController'
  );
  router.put(
    '/worlds/:id/join',
    requireAuth,
    selectWorldPutController.run.bind(selectWorldPutController)
  );
};
