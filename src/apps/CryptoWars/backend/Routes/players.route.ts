import {Router} from 'express';
import container from '../dependency-injection';
import {requireAuth} from '../Auth';
import {PlayerGetController} from '../Controllers/Players/PlayerGetController';

// todo: change for worlds/:id/select
export const register = (router: Router) => {
  const playerGetController: PlayerGetController = container.get(
    'Apps.CryptoWars.Backend.Controllers.PlayerGetController'
  );
  router.get('/player', requireAuth, playerGetController.run.bind(playerGetController));
};
