import { Router } from 'express';
import { requireAuth } from '../../Auth';
import { ArmyGetController } from '../../Controllers/Battlefield/Armies/ArmyGetController';
import { DependencyInjector } from '../../dependency-injection/dependencyInjector';

export const register = (router: Router) => {
  const armyGetController = DependencyInjector.get(ArmyGetController);
  router.get('/army', requireAuth, armyGetController.run.bind(armyGetController));
};
