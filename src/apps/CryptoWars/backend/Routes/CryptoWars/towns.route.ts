import { Router } from 'express';
import container from '../../dependency-injection';
import { requireAuth } from '../../Auth';
import { TrainSoldiersPostController } from '../../Controllers/CryptoWars/Towns/TrainSoldiersPostController';

export const register = (router: Router) => {
  const trainSoldiersPostController: TrainSoldiersPostController = container.get(
    'Apps.CryptoWars.Backend.Controllers.TrainSoldiersPostController'
  );
  router.post(
    '/towns/:id/train-soldiers',
    requireAuth,
    trainSoldiersPostController.run.bind(trainSoldiersPostController)
  );
};
