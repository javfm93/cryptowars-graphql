import { Router } from 'express';
import container from '../dependency-injection';
import { SendAttackPutController } from '../Controllers/Battlefield/Attacks/SendAttackPutController';
import { requireAuth } from '../Auth';

export const register = (router: Router) => {
  const sendAttackPutController: SendAttackPutController = container.get(
    'Apps.Battlefield.Backend.Controllers.SendAttackPutController'
  );
  router.put(
    '/attacks/:id',
    requireAuth,
    sendAttackPutController.run.bind(sendAttackPutController)
  );
};
