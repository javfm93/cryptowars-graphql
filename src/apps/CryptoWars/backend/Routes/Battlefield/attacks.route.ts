import { Router } from 'express';
import { SendAttackPutController } from '../../Controllers/Battlefield/Attacks/SendAttackPutController';
import { requireAuth } from '../../Auth';
import { DependencyInjector } from '../../dependency-injection/dependencyInjector';

export const register = (router: Router) => {
  const sendAttackPutController = DependencyInjector.get(SendAttackPutController);
  router.put(
    '/attacks/:id',
    requireAuth,
    sendAttackPutController.run.bind(sendAttackPutController)
  );
};
