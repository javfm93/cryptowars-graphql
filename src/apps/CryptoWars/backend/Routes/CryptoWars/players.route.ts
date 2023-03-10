import { Router } from 'express';
import { requireAuth } from '../../Auth';
import { PlayerGetController } from '../../Controllers/CryptoWars/Players/PlayerGetController';
import { DependencyInjector } from '../../dependency-injection/dependencyInjector';

export const register = (router: Router) => {
  const playerGetController = DependencyInjector.get(PlayerGetController);
  router.get('/player', requireAuth, playerGetController.run.bind(playerGetController));
};
