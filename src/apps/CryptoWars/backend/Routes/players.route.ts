import { Router } from 'express';
import container from '../dependency-injection';
import { SelectWorldPutController } from '../Controllers/Players/SelectWorldPutController';
import { requireAuth } from '../Auth';
import { PlayerGetController } from '../Controllers/Players/PlayerGetController';

export const register = (router: Router) => {
  const selectWorldPutController: SelectWorldPutController = container.get(
    'Apps.CryptoWars.Backend.Controllers.SelectWorldPutController'
  );
  router.put(
    '/players/select-world',
    requireAuth,
    selectWorldPutController.run.bind(selectWorldPutController)
  );

  const playerGetController: PlayerGetController = container.get(
    'Apps.CryptoWars.Backend.Controllers.PlayerGetController'
  );
  router.get('/player', requireAuth, playerGetController.run.bind(playerGetController));
};
