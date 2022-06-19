import { Router } from 'express';
import container from '../dependency-injection';
import { WorldsGetController } from '../Controllers/Worlds/WorldsGetController';

export const register = (router: Router) => {
  const worldsGetController: WorldsGetController = container.get(
    'Apps.CryptoWars.Backend.Controllers.WorldsGetController'
  );
  router.get('/worlds', worldsGetController.run.bind(worldsGetController));
};
