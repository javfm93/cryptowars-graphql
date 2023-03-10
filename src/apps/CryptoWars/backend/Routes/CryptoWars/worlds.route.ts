import { Router } from 'express';
import { WorldsGetController } from '../../Controllers/CryptoWars/Worlds/WorldsGetController';
import { requireAuth } from '../../Auth';
import { JoinWorldPutController } from '../../Controllers/CryptoWars/Worlds/JoinWorldPutController';
import { WorldGetController } from '../../Controllers/CryptoWars/Worlds/WorldGetController';
import { DependencyInjector } from '../../dependency-injection/dependencyInjector';

export const register = (router: Router) => {
  const worldsGetController = DependencyInjector.get(WorldsGetController);
  router.get('/worlds', requireAuth, worldsGetController.run.bind(worldsGetController));

  const worldGetController = DependencyInjector.get(WorldGetController);
  router.get('/worlds/:id', requireAuth, worldGetController.run.bind(worldGetController));

  const selectWorldPutController = DependencyInjector.get(JoinWorldPutController);
  router.put(
    '/worlds/:id/join',
    requireAuth,
    selectWorldPutController.run.bind(selectWorldPutController)
  );
};
