import { Router } from 'express';
import container from '../dependency-injection';
import { SelectWorldPutController } from '../Controllers/Players/SelectWorldPutController';
import { requireAuth } from '../Auth';

export const register = (router: Router) => {
  const selectWorldPutController: SelectWorldPutController = container.get(
    'Apps.CryptoWars.Backend.Controllers.SelectWorldPutController'
  );
  router.put(
    '/players/select-world',
    requireAuth,
    selectWorldPutController.run.bind(selectWorldPutController)
  );
};
