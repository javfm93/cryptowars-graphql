import { Router } from 'express';
import container from '../../dependency-injection';
import { BattlesGetController } from '../../Controllers/Battlefield/Battles/BattlesGetController';
import { requireAuth } from '../../Auth';

export const register = (router: Router) => {
  const worldsGetController: BattlesGetController = container.get(
    'Apps.Battlefield.Backend.Controllers.BattlesGetController'
  );
  router.get('/battles', requireAuth, worldsGetController.run.bind(worldsGetController));
};
