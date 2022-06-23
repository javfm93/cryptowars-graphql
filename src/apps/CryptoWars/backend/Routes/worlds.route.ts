import { Router } from 'express';
import container from '../dependency-injection';
import { WorldsGetController } from '../Controllers/Worlds/WorldsGetController';
import { requireAuth } from '../Auth';

export const register = (router: Router) => {
  const worldsGetController: WorldsGetController = container.get(
    'Apps.CryptoWars.Backend.Controllers.WorldsGetController'
  );
  const worldsGetController: WorldsGetController = container.get(
    'Apps.CryptoWars.Backend.Controllers.WorldsGetController'
  );
  router.get('/worlds', requireAuth, worldsGetController.run.bind(worldsGetController));
  router.post(
    '/worlds/:id/players',
    requireAuth,
    worldsGetController.run.bind(worldsGetController)
  );
};
