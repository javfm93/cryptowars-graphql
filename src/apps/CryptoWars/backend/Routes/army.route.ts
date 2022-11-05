import { Router } from 'express';
import container from '../dependency-injection';
import { requireAuth } from '../Auth';
import { ArmyGetController } from '../Controllers/Armies/ArmyGetController';

export const register = (router: Router) => {
  const armyGetController: ArmyGetController = container.get(
    'Apps.Battlefield.Backend.Controllers.ArmyGetController'
  );
  router.get('/army', requireAuth, armyGetController.run.bind(armyGetController));
};
