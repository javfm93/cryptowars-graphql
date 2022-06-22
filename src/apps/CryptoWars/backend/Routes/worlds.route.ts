import { Router } from 'express';
import container from '../dependency-injection';
import { WorldsGetController } from '../Controllers/Worlds/WorldsGetController';
import { isAuthenticated } from '../server';

export const register = (router: Router) => {
  const worldsGetController: WorldsGetController = container.get(
    'Apps.CryptoWars.Backend.Controllers.WorldsGetController'
  );
  router.get('/worlds', isAuthenticated, worldsGetController.run.bind(worldsGetController));
};
