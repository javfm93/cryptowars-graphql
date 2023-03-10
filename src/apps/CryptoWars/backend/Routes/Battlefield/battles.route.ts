import { Router } from 'express';
import { BattlesGetController } from '../../Controllers/Battlefield/Battles/BattlesGetController';
import { requireAuth } from '../../Auth';
import { DependencyInjector } from '../../dependency-injection/dependencyInjector';

export const register = (router: Router) => {
  const worldsGetController = DependencyInjector.get(BattlesGetController);
  router.get('/battles', requireAuth, worldsGetController.run.bind(worldsGetController));
};
